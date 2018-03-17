import React from 'react';
import {
  View,
  Dimensions,
  Image,
  PixelRatio,
  TouchableOpacity,
  Text
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import Helper from '../../helper';

import * as globalColors from '../../constants/styles/global';


const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const pixelRatio = PixelRatio.get();

const AttachmentAlertBox = props => {
  return (
    <View style={styles.container}>

      <TouchableOpacity
        style={{ marginTop: 8 }}
        onPress={() => props.onCameraPress()} // callback
      >

        <View style={styles.cameraButton}>

          <Icon name="ios-camera" size={30} color={globalColors.DARK_BLUE} style={{ alignSelf: 'center' }} />
          <Text
            style={styles.actionText}
          >
            Camera
          </Text>

        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => props.onGalleryPress()} // callback
      >


        <View style={styles.galleryButton}>

          <Icon name="ios-albums" size={30} color={globalColors.DARK_BLUE} style={{ alignSelf: 'center' }} />

          <Text
            style={styles.actionText}
          >
            Gallery
          </Text>
        </View>

      </TouchableOpacity>

    </View>
  );
};

const styles = {
  addAttachmentTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: Helper.scaleUnit(pixelRatio, 'height', 5)
  },
  actionText: {
    alignSelf: 'center',
    marginLeft: Helper.scaleUnit(pixelRatio, 'width', 25),
  },
  cameraButton: {
    flexDirection: 'row',
    height: Helper.scaleUnit(pixelRatio, 'height', 40),
    width: Helper.scaleUnit(pixelRatio, 'width', 250),
    alignSelf: 'center',
    marginTop: Helper.scaleUnit(pixelRatio, 'height', 40),
    paddingLeft: Helper.scaleUnit(pixelRatio, 'width', 25),
    backgroundColor: globalColors.WHITE
  },
  container: {
    height: Helper.scaleUnit(pixelRatio, 'height', 225),
    width: Helper.scaleUnit(pixelRatio, 'width', 315),
    top: Helper.scaleUnit(pixelRatio, 'height', 100),
    backgroundColor: globalColors.MEDIUM_WHITE,
    borderRadius: 5,
    position: 'absolute',
    alignSelf: 'center',
  },
  galleryButton: {
    flexDirection: 'row',
    height: Helper.scaleUnit(pixelRatio, 'height', 40),
    width: Helper.scaleUnit(pixelRatio, 'width', 250),
    alignSelf: 'center',
    marginTop: Helper.scaleUnit(pixelRatio, 'height', 40),
    paddingLeft: Helper.scaleUnit(pixelRatio, 'width', 25),
    backgroundColor: globalColors.WHITE
  },

  icon: {
    alignSelf: 'center',
    marginLeft: Helper.scaleUnit(pixelRatio, 'width', 9)
  }
};
export { AttachmentAlertBox };
