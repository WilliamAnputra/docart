import React, { Component } from 'react';
import {
    View, Dimensions, PixelRatio, TouchableOpacity, TouchableWithoutFeedback,
    Text, FlatList, Image, ToastAndroid, BackHandler, AsyncStorage
} from 'react-native';

import { RNCamera } from 'react-native-camera';
import ImagePicker from 'react-native-image-picker';

import Icon from 'react-native-vector-icons/Ionicons';

import Helper from '../../helper';
import * as constants from '../../constants/constants';
import * as globalColors from '../../constants/styles/global';
import * as icons from '../../constants/icons';


import { AttachmentAlertBox } from '../subComponent/AttachmentAlertBox';


// List of Images
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const photoLimitWarning = 'Anda sudah mencapai batas jumlah upload foto';

const pixelRatio = PixelRatio.get();

export class MainScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            photos: [],
            hideOption: true,
            showCamera: false,
            showGallery: false,
        };
    }

    async componentWillMount() {
        // check if we have any store photos
        const savedPhotos = await AsyncStorage.getItem(constants.PHOTOS);

        if (savedPhotos == null) {
            return null;
        }

        // if we do have photos then use our current photo
        return this.setState({ photos: JSON.parse(savedPhotos) });
    }

    componentDidMount() {

        BackHandler.addEventListener('hardwareBackPress', () => {
            return BackHandler.exitApp();
        });
    }

    componentWillUnmount() {
        return BackHandler.removeEventListener('hardwareBackPress');
    }


    // function when user press 'Snap' button
    takePicture = async () => {

        if (this.camera) {
            const options = { quality: 1, base64: true, width: 600, exif: true };
            const data = await this.camera.takePictureAsync(options);
            await this.setState({ photos: [...this.state.photos, data.uri], showCamera: false, hideOption: true }, () => {
                AsyncStorage.setItem(constants.PHOTOS, JSON.stringify(this.state.photos));
            });

        }
    };

    // a container to show or hide 'camera' preview screen
    showCamera() {
        if (this.state.showCamera) {
            return (
                <View style={{
                    flexDirection: 'column',
                    backgroundColor: 'black',
                    position: 'absolute',
                    height: SCREEN_HEIGHT,
                    width: SCREEN_WIDTH
                }}>
                    <RNCamera
                        ref={ref => {
                            this.camera = ref;
                        }}
                        style={styles.preview}
                        type={RNCamera.Constants.Type.back}
                        flashMode={RNCamera.Constants.FlashMode.off}
                        permissionDialogTitle={'Permission to use camera'}
                        permissionDialogMessage={'We need your permission to use your camera phone'}
                    />
                    <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center', }}>
                        <TouchableOpacity
                            onPress={() => this.takePicture()}
                            style={styles.capture}
                        >
                            <Text style={{ fontSize: 14 }}> SNAP </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={async () => this.setState({ showCamera: false, hideOption: true })}
                            style={styles.capture}
                        >
                            <Text style={{ fontSize: 14 }}> Close </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
        return null;

    }

    // floating button component
    async floatingButtonOnPress() {
        if (this.state.photos.length == 3) {
            return ToastAndroid.show(photoLimitWarning, ToastAndroid.SHORT);
        }

        return this.setState({ hideOption: false });
    }

    showGallery() {
        if (this.state.showGallery) {
            const options = {
                maxWidth: 600,
                maxHeight: 450,
            };
            // Open Image Library:
            ImagePicker.launchImageLibrary(options, (response) => {

                // if user cancels
                if (response.didCancel == true) {
                    return this.setState({ showGallery: false, hideOption: true });
                }

                const imageUri = response.uri;
                this.setState({ showGallery: false, hideOption: true, photos: [...this.state.photos, imageUri] }, () => {
                    AsyncStorage.setItem(constants.PHOTOS, JSON.stringify(this.state.photos));
                });
            });
        }
        return null;
    }

    // callback function to be passed to 'AttachmentAlertBox' as a callback function
    onCameraPress = async () => {
        await this.setState({ showCamera: true });
    }
    // callback function to be passed to 'AttachmentAlertBox' as a callback function
    onGalleryPress = async () => {
        await this.setState({ showGallery: true });
    }

    // function to show photo upload method to user
    showUploadOptions() {
        if (this.state.hideOption == false) {
            return <AttachmentAlertBox onCameraPress={this.onCameraPress} onGalleryPress={this.onGalleryPress} />;
        }
        return null;
    }

    // flatlist's automatic detect prop if data is empty
    renderEmptyList() {
        return (
            <Text style={{ alignSelf: 'center' }}> No photos available</Text>
        );
    }

    // function to delete photos
    async deletePhoto() {
        await this.setState({ photos: [] });
    }

    async logOut() {
        AsyncStorage.multiRemove([constants.ACCESS_TOKEN, constants.PHOTOS], (err) => {
            if (err) {
                return ToastAndroid.show(err, ToastAndroid.SHORT);
            }
        });

        return this.props.navigation.navigate('LoginScreen');
    }

    render() {
        const DismissBox = ({ children }) => {
            return (
                <TouchableWithoutFeedback onPress={() => this.setState({ hideOption: true })}>
                    {children}
                </TouchableWithoutFeedback>
            );
        };

        const { container, toolbar, logo, logOutButton, imageSize, deletePhotosBox, floatingActionButton } = styles;

        return (
            <DismissBox>
                <View style={container}>
                    <View style={toolbar} />
                    <Image source={icons.LOGO} style={logo} />

                    <TouchableOpacity
                        style={logOutButton}
                        onPress={() => this.logOut()}>

                        <Text style={{ color: globalColors.WHITE, marginTop: 5 }}> LogOut </Text>
                    </TouchableOpacity>

                    <FlatList
                        data={this.state.photos}
                        style={{ height: SCREEN_HEIGHT }}
                        numColumns={2}
                        keyExtractor={data => data}
                        extraData={this.state.photos}
                        ListEmptyComponent={() => this.renderEmptyList()}
                        renderItem={data => {
                            return (
                                <Image source={{ uri: data.item }} style={imageSize} />
                            );
                        }}
                    />

                    <TouchableOpacity
                        style={deletePhotosBox}
                        onPress={() => this.deletePhoto()}>

                        <Text style={{ color: globalColors.WHITE }}> Delete </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={floatingActionButton}
                        onPress={() => this.floatingButtonOnPress()}>

                        <Icon name="md-add" size={30} color={globalColors.WHITE} />

                    </TouchableOpacity>



                    {this.showUploadOptions()}

                    {this.showCamera()}

                    {this.showGallery()}
                </View>

            </DismissBox>

        );
    }
}


const styles = {
    container: {
        flex: 1,
        backgroundColor: globalColors.WHITE
    },
    backArrow: {
        position: 'absolute',
        top: Helper.scaleUnit(pixelRatio, 'height', 10),
        left: Helper.scaleUnit(pixelRatio, 'height', 10),
    },
    capture: {
        flex: 0,
        backgroundColor: globalColors.WHITE,
        borderRadius: 5,
        padding: Helper.scaleUnit(pixelRatio, 'height', 15),
        paddingHorizontal: Helper.scaleUnit(pixelRatio, 'width', 20),
        alignSelf: 'center',
        margin: Helper.scaleUnit(pixelRatio, 'height', 20),
    },
    floatingActionButton: {
        position: 'absolute',
        right: Helper.scaleUnit(pixelRatio, 'width', 10),
        bottom: Helper.scaleUnit(pixelRatio, 'height', 40),
        width: Helper.scaleUnit(pixelRatio, 'width', 50),
        height: Helper.scaleUnit(pixelRatio, 'height', 50),
        borderRadius: 25,
        borderColor: 'transparent',
        borderWidth: 0.4,
        backgroundColor: globalColors.DARK_BLUE,
        justifyContent: 'center',
        alignItems: 'center'
    },
    deletePhotosBox: {
        position: 'absolute',
        left: Helper.scaleUnit(pixelRatio, 'width', 10),
        bottom: Helper.scaleUnit(pixelRatio, 'height', 40),
        width: Helper.scaleUnit(pixelRatio, 'width', 100),
        height: Helper.scaleUnit(pixelRatio, 'height', 50),
        borderColor: 'transparent',
        borderWidth: 0.4,
        backgroundColor: globalColors.DARK_BLUE,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageSize: {
        height: Helper.scaleUnit(pixelRatio, 'height', 200),
        width: Helper.scaleUnit(pixelRatio, 'height', 200),
        margin: 5
    },
    logo: {
        height: Helper.scaleUnit(pixelRatio, 'height', 30),
        width: Helper.scaleUnit(pixelRatio, 'width', 100),
        alignSelf: 'center',
        position: 'absolute',
        top: Helper.scaleUnit(pixelRatio, 'height', 10),
    },
    logOutButton: {
        position: 'absolute',
        top: 0,
        right: 10
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    toolbar: {
        height: Helper.scaleUnit(pixelRatio, 'height', 56),
        width: SCREEN_WIDTH,
        backgroundColor: globalColors.DARK_BLUE
    },
};
