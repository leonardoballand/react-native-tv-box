'use strict'
/**
 * 
 * React-Native-Tv-Box
 * by Leonardo BALLAND <balland.leonardo@outlook.fr>
 * 
 * Unified API for french TV boxes
 * Actually supports :
 * 
 * LIVEBOX
 * @param Operation
 *  10: Box status
 *  01: Remote action
 *  09: Channels zap
 * @param Mode
 *  0: Unique key press
 *  1: Long key press
 *  2: Long key press release
 * @param Code
 *  Keymaps.json
 *
 * 
 * FREEBOX
 * @param Code
 *  Remote network code
 * @param Long
 *  True: Long key press
 *  False: Normal key press
 * @param Key
 *  Keymaps.json
 * 
 * 
 */

import 'whatwg-fetch'

const Keymaps = require('./Keymaps.json')

let instance = null

class RNTvBox {

    constructor() {
        if (!instance) {
            this._uri = null
            this._settings = {}
            instance = this
        }

        return instance
    }

    get uri() {
        return this._uri
    }

    set uri(uri) {
        if (uri && typeof uri === 'string') {
            this._uri = uri
        }
    }

    get settings() {
        return this._settings
    }

    set settings(params) {
        if (params && typeof params === 'object') {
            if (params.networkCode && typeof params.networkCode !== "number") {
                throw Error('Wrong remote network code. Number required!')
            }

            if (typeof params.ip !== "string") {
                throw Error('Wrong IP address. Livebox: "http://xx.xx.xx.xx:port" || Freebox: "http://hdx.freebox.fr"')
            }

            this._settings = Object.assign({}, this._settings, {
                _previousState: {
                    networkCode: this._settings.networkCode,
                    ip: this._settings.ip,
                },
                networkCode: params.networkCode,
                ip: params.ip
            })

            this._setURI()
        }
    }

    _setURI() {
        let URI
        switch(this._pid && typeof this._pid === 'number') {
            case 0:
                URI = `${this._settings.ip}/remoteControl/cmd`
                break
            case 1:
                URI = `${this._settings.ip}/pub/remote_control?code=${this._settings.networkCode}`
                break
            default:
                URI = null
        }
        
        if (URI && typeof URI === 'string') {
            this.uri = URI
        } else {
            throw Error('Unknown platform. Please set platform before to use!')
        }
    }

    _sendCommand(params) {
        let request = null
        if (this._pid) {
            switch(this._pid) {
                case 0:
                    request = `${this._uri}?operation=${params.operation}&key=${params.key}&${params.mode}`
                    break
                case 1:
                    request = `${this._uri}&key=${params.key}&${params.mode}`
                    break
            }
            return new Promise((resolve, reject) => {
                fetch(request)
                    .then(res => res.json())
                    .then(json => resolve(json.result))
                    .catch(err => reject(err))
            })
        } else {
            throw Error("Unknown platform. Use setPlatform() before anything else!")
        }
    }

    /**
     * setPlaform()
     * Defines platform id and set options required
     * @param {String} platform 
     * @param {Object} options
     * - ip {String} // 'http://xx.xx.xx.xx:port'
     * - remoteCode {Number} // Freebox only
     * - name {String} // Freebox only 'hd1', 'hd2'
     * 
     * Sample:
     * TvBox.setPlatform('livebox', {
     *  ip: 'http://192.168.1.13:8080',
     * })
     */
    setPlatform(platform = null, options = null) {
        if (!platform || typeof platform !== 'string') {
            throw Error('Missing platform name. String "livebox" or "freebox" required!')
        } else {                
            platform = platform.toLowerCase()            
            if (platform === 'freebox') {
                this._pid = 1
            } else if (platform === 'livebox') {
                this._pid = 0
            } else {
                throw Error('Unknown platform! Only "livebox", "freebox" supported!')
            }
                            
            if (options && typeof options === 'object') {
                this.settings = options
            } else {
                throw Error('Missing platform options. Object options required!')
            }

            return (
                {
                    responseCode: '0',
                    message: 'ok', 
                    data: Object.assign({}, options, {
                        platform: platform
                    })
                }
            )

        }
    }

    /**
     * getStatus()
     * Returns STB status (Livebox only)
     * @return {String} 'standby' || 'active' || 'playing'
     */
    getStatus() {
        if (this._pid) {
            return new Promise((resolve, reject) => {
                fetch(`${this.uri}?operation=10`)
                    .then(res => res.json())
                    .then(json => {
                        const response = json.result
                        if (response.responseCode === "0" && response.message === "ok") {
                            const { data } = response
                            switch(data.activeStandbyState) {
                                case "1":
                                    resolve('standby')
                                    break
                                case "0":
                                    data.playedMediaState !== undefined ?
                                        resolve('playing') :
                                            resolve('active')
                                    break
                            }
                        }
                    })
                    .catch(err => reject(err))
            })
        } else {
            throw Error("Unknown platform. Use setPlatform() before anything else!")
        }
    }

    /**
     * getInfos()
     * Returns STB informations (Livebox only)
     * @return {Object}
     * 
     * Sample states:
     * STANDBY
     * 
     * "data": { 
     *     "osdContext": "MAIN_PROCESS", 
     *     "macAddress": "18:62:2C:xx:xx:xx", 
     *     "wolSupport": "0", 
     *     "friendlyName": "décodeur TV d'Orange", 
     *     "activeStandbyState": "1"
     * }
     * 
     * POWER ON
     * 
     * "data": { 
     *     "osdContext": "HOMEPAGE", 
     *     "macAddress": "18:62:2C:xx:xx:xx", 
     *     "wolSupport": "0", 
     *     "friendlyName": "décodeur TV d'Orange", 
     *     "activeStandbyState": "0" 
     * }
     * 
     * PLAYING
     * 
     * "data": { 
     *     "timeShiftingState": "0", 
     *     "playedMediaType": "LIVE", 
     *     "playedMediaState": "PLAY", 
     *     "playedMediaId": "47", 
     *     "playedMediaContextId": "1", 
     *     "playedMediaPosition": "NA", 
     *     "osdContext": "LIVE", 
     *     "macAddress": "18:62:2C:xx:xx:xx", 
     *     "wolSupport": "0", 
     *     "friendlyName": "décodeur TV d'Orange", 
     *     "activeStandbyState": "0" 
     * }
     */
    getInfos() {
        if (this._pid) {
            return new Promise((resolve, reject) => {
                fetch(`${this.uri}?operation=10`)
                    .then(res => res.json())
                    .then(json => {
                        const response = json.result
                        if (response.responseCode === "0" && response.message === "ok") {
                            resolve(response.data)
                        }
                    })
                    .catch(err => reject(err))
            })
        } else {
            throw Error("Unknown platform. Use setPlatform() before anything else!")
        }
    }

    /**
     * set()
     * Send a command to Tv Box
     * @param {Object} action 
     *  key {String},
     *  mode {key/value}
     * @return {Object} response
     */
    set(action = null) {
        if (this._pid) {
            if (!action || typeof action !== 'object') {
                throw Error('Unknown action. Object containing action parameters required!')
            } else {
                if (!action.key || typeof action.key !== 'string' || !action.mode || typeof action.mode !== 'object') {
                    throw Error('Action error: Key must be String type!')
                } else {
                    return this._sendCommand({
                        key: `${Keymaps[this._pid].keys[action.key]}`,
                        mode: `${Object.keys(action.mode)}=${action.mode[Object.keys(action.mode)]}`,
                        operation: '01',
                    })
                }
            }
        } else {
            throw Error("Unknown platform. Use setPlatform() before anything else!")
        }
    }

}

export default new RNTvBox()
