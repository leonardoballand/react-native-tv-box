'use strict'

import { fetch } from 'node-fetch'

/**
 * Livebox
 * @param Opération
 * 10: Status de la livebox
 * 01: Action de télécommande
 * 09: Changer de chaîne
 * @param Mode
 * 0: Envoi unique de touche
 * 1: Appui prolongé de touche
 * 2: Relâchement de touche après appui prolongé
 * @param Code
 * Keymaps[0][i]
 */

/**
 * Freebox
 * @param Code
 * Code réseau de la télécommande
 * @param Long
 * True: Appui prolongé
 * False: Appui court
 * @param Key
 * Keymaps[1][i]
 */

const Keymaps = [
    {
        "name": "livebox",
        "keys": {
            "power": 116,
            "0": 512,
            "1": 513,
            "2": 514,
            "3": 515,
            "4": 516,
            "5": 517,
            "6": 518,
            "7": 519,
            "8": 520,
            "9": 521,
            "epg_up": 402,
            "epg_dwn": 403,
            "vol_up": 115,
            "vol_dwn": 114,
            "mute": 113,
            "up": 103,
            "left": 105,
            "right": 116,
            "down": 108,
            "ok": 352,
            "back": 158,
            "menu": 139,
            "play": 164,
            "rec": 167,
            "fbackward": 168,
            "fforward": 159,
            "vod": 393,
        }
    },
    {
        "name": "freebox",
        "keys": {
            "power": "power",
            "red": "red",
            "green": "green",
            "blue": "blue",
            "yellow": "yellow",
            "list": "list",
            "tv": "tv",
            "0": 0,
            "1": 1,
            "2": 2,
            "3": 3,
            "4": 4,
            "5": 5,
            "6": 6,
            "7": 7,
            "8": 8,
            "9": 9,
            "back": "back",
            "swap": "swap",
            "info": "info",
            "epg": "epg",
            "mail": "mail",
            "media": "media",
            "help": "help",
            "options": "options",
            "pip": "pip",
            "vol_up": "vol_inc",
            "vol_dwn": "vol_dec",
            "ok": "ok",
            "up": "up",
            "left": "left",
            "right": "right",
            "down": "down",
            "epg_up": "prgm_inc",
            "epg_dwn": "prgm_dec",
            "mute": "mute",
            "menu": "home",
            "rec": "rec",
            "play": "play",
            "fbackward": "bwd",
            "fforward": "fwd",
            "prev": "prev",
            "next": "next",
        }
    },
]

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
        if (uri) {
            this._uri = uri
        }
    }

    get settings() {
        return this._settings
    }

    set settings(params) {
        if (params) {
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

    _sendRequest(params) {
        let request = null
        if (this._pid === 0) {
            request = fetch(`${this._uri}?key=${params.key}&${params.mode}`)
        } else if (this._pid === 1) {
            request =fetch(`${this._uri}&key=${params.key}&${params.mode}`)
        }
        request.then((data) => Object.assign({}, data))
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
        }

        if (options && typeof options === 'object') {
            this.settings = options
        } else {
            throw Error('Missing platform options. Object options required!')
        }
    }

    /**
     * getStatus()
     * Returns STB status (Livebox only)
     * @return {String} status URI
     * 
     * Sample states: 
     * STANDBY
     * { 
     *  "result": { 
     *      "responseCode": "0", 
     *      "message": "ok", 
     *      "data": { 
     *          "osdContext": "MAIN_PROCESS", 
     *          "macAddress": "18:62:2C:xx:xx:xx", 
     *          "wolSupport": "0", 
     *          "friendlyName": "décodeur TV d'Orange", 
     *          "activeStandbyState": "1"
     *      } 
     *  } 
     * }
     * 
     * POWER ON
     * { 
     *  "result": { 
     *      "responseCode": "0", 
     *      "message": "ok", 
     *      "data": { 
     *          "osdContext": "HOMEPAGE", 
     *          "macAddress": "18:62:2C:xx:xx:xx", 
     *          "wolSupport": "0", 
     *          "friendlyName": "décodeur TV d'Orange", 
     *          "activeStandbyState": "0" 
     *      } 
     *  } 
     * }
     * 
     * PLAYING
     * { 
     *  "result": { 
     *      "responseCode": "0", 
     *      "message": "ok", 
     *      "data": { 
     *          "timeShiftingState": "0", 
     *          "playedMediaType": "LIVE", 
     *          "playedMediaState": "PLAY", 
     *          "playedMediaId": "47", 
     *          "playedMediaContextId": "1", 
     *          "playedMediaPosition": "NA", 
     *          "osdContext": "LIVE", 
     *          "macAddress": "18:62:2C:xx:xx:xx", 
     *          "wolSupport": "0", 
     *          "friendlyName": "décodeur TV d'Orange", 
     *          "activeStandbyState": "0" 
     *      } 
     *  } 
     * }
     */
    getStatus() {
        return `${this._uri}?operation=10`
        /*
        fetch(`${this._uri}?operation=10`)
            .then(data => data.json())
            .then(res => {
                const {data} = res.result
                switch (data.) {

                }
            })
        */
    }

    /**
     * 
     * @param {Object} action 
     * key, mode
     * @return {Object} response
     */
    set(action = null) {
        if (!action || typeof action !== 'object') {
            throw Error('Unknown action. Object containing action parameters required!')
        } else {
            if (!action.key || typeof action.key !== 'string' || !action.mode || typeof action.mode !== 'object') {
                throw Error('Action error: Key must be String type!')
            } else {
                const params = {
                    key: `key=${Keymaps[this._pid][action.key]}`,
                    mode: `${Object.keys(action.mode)}=${action.mode[Object.keys(action.mode)]}`,
                }
                return this._sendRequest(params)
            }
        }



    }

}

export default new RNTvBox()
