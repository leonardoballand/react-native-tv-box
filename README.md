
# react-native-tv-box
TvBox is a custom React-Native package to help people building remote controller mobile application. A unique APIs of every french TV box is the objective of this package. It helps to focus on UI development, which should be our main goal using React-Native...ain't it?

I've developed this package to introduce my new Youtube video series about React Native, so I'd be pleased to see you support, contribute and share my work :)

## Getting started

`$ npm install react-native-tv-box --save`

### Mostly automatic installation

`$ react-native link react-native-tv-box`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-tv-box` and add `RNTvBox.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNTvBox.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.reactlibrary.RNTvBoxPackage;` to the imports at the top of the file
  - Add `new RNTvBoxPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-tv-box'
  	project(':react-native-tv-box').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-tv-box/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-tv-box')
  	```

#### Windows
[Read it! :D](https://github.com/ReactWindows/react-native)

1. In Visual Studio add the `RNTvBox.sln` in `node_modules/react-native-tv-box/windows/RNTvBox.sln` folder to their solution, reference from their app.
2. Open up your `MainPage.cs` app
  - Add `using Com.Reactlibrary.RNTvBox;` to the usings at the top of the file
  - Add `new RNTvBoxPackage()` to the `List<IReactPackage>` returned by the `Packages` method


## Usage

### Methods
#### setPlatform(platform, options)
Initialize platform (see **API Support** for options) and returns:
- responseCode: "0" if no error
- message: "ok" if no error
- data: Data sent to initialize platform

#### set({key, mode})
Send command to your box and returns:
- responseCode: "0" if no error
- message: "ok" if no error
- data: null
#### getStatus() - Livebox only
Ask for box status and returns:
* 'active' when box is ON
* 'standby' when box is OFF
* 'playing' when box is playing media or liveTV

#### getInfos() - Livebox only
Ask for box informations and returns:
- timeShiftingState: timeshift status
- playedMediaType: current media type
- playedMediaState: current media status
- playedMediaId: current channel ID
- playedMediaContextId: current media context id
- playedMediaPosition: current media position
- osdContext: Current screen
- macAddress: Device MAC address
- wolSupport: Wake-on-Lan support status
- friendlyName: Box name
- activeStandbyState: Standby status

### API Support
*25/07/17* Only **Livebox** and **Freebox** are currently supported

| Remote keys      | Alias       | Livebox     | Freebox      |
|------------------|-------------|-------------|--------------|
| Power            | power		 | ✔           | ✔           |
| 0-9              | 0-9		 | ✔           | ✔           |
| Up arrow         | up			 | ✔           | ✔           |
| Left arrow       | left		 | ✔           | ✔           |
| Right arrow      | right		 | ✔           | ✔           |
| Down arrow       | down		 | ✔           | ✔           |
| Increase volume  | vol_up		 | ✔           | ✔           |
| Decrease volume  | vol_dwn	 | ✔           | ✔           |
| Previous channel | epg_up		 | ✔           | ✔           |
| Next channel     | epg_dwn	 | ✔           | ✔           |
| Mute             | mute		 | ✔           | ✔           |
| OK               | ok			 | ✔           | ✔           |
| Back             | back		 | ✔           | ✔           |
| Menu             | menu		 | ✔           | ✔           |
| Play/Pause       | play		 | ✔           | ✔           |
| Rec              | rec		 | ✔           | ✔           |
| Fast backward    | fbackward	 | ✔           | ✔           |
| Fast forward     | fforward	 | ✔           | ✔           |
| Previous		   | prev		 | ✗           | ✔           |
| Next		       | next		 | ✗           | ✔           |
| VOD              | vod		 | ✔           | ✗           |
| Red              | red		 | ✗           | ✔           |
| Green            | green		 | ✗           | ✔           |
| Blue             | blue		 | ✗           | ✔           |
| Yellow           | yellow		 | ✗           | ✔           |
| List             | list		 | ✗           | ✔           |
| Tv               | tv			 | ✗           | ✔           |
| Swap             | swap		 | ✗           | ✔           |
| Info             | info		 | ✗           | ✔           |
| EPG              | epg		 | ✗           | ✔           |
| Mail             | mail		 | ✗           | ✔           |
| Media            | media		 | ✗           | ✔           |
| Help             | help		 | ✗           | ✔           |
| Options          | options	 | ✗           | ✔           |
| Pip              | pip		 | ✗           | ✔           |

### Example

Try TvBoxExample Application in `./Example` folder
```javascript
import RNTvBox from 'react-native-tv-box'

class TVBox extends React.Component {

	constructor() {
		super()

		this.state = {
			status: '',
			name: '',
		}
	}

	componentDidMount() {
		RNTvBox.setPlatform('livebox', {ip: 'http://192.168.1.13:8080'}) // set platform
			.then(res => {
				if (res.responseCode === "0" && res.message === "ok") {
					this.getStatus()
					this.getName()
				}
			})
			.catch(err => console.log(err))
	}

	getStatus() {
		RNTvBox.getStatus()
		.then(status => {
			this.setState({status: status})
		})
		.catch(err => console.error(err))
	}

	getName() {
		RNTvBox.getInfos()
		.then(infos => {
			this.setState({name: infos.friendlyName})
		})
		.catch(err => console.error(err))
	}

	render() {
		return(
			<View>
				<Text>Box: {this.state.name}</Text>
				<Text>Status: {this.state.status}</Text>
			</View>
		)
	}
}
```

## TODO
- ~~setPlatform() must return request state~~
  