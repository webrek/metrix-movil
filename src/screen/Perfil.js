import React, {useContext, useState} from 'react';
import {Text, View, PermissionsAndroid, Platform} from 'react-native';
import {AuthContext} from '../lib/AuthProvider';
import {Avatar, Button, FAB} from '@rneui/themed';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import api from '../util/api';
import {API_AVATAR} from '@env';
import {Icon} from '@rneui/base';

const PerfilScreen = ({navigation}) => {
  const {user, logOut} = useContext(AuthContext);
  const [filePath, setFilePath] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [userAvatar, setUserAvatar] = useState(API_AVATAR + user.id);

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else {
      return true;
    }
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else {
      return true;
    }
  };

  const chooseFile = async () => {
    let options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      await launchCamera(options, response => {
        setFilePath(response);
        if (response.didCancel) {
          //alert('User cancelled camera picker');
          return;
        } else if (response.errorCode === 'camera_unavailable') {
          //alert('Camera not available on device');
          return;
        } else if (response.errorCode === 'permission') {
          //alert('Permission not satisfied');
          return;
        } else if (response.errorCode === 'others') {
          //alert(response.errorMessage);
          return;
        } else {
          const file = {
            name: response.assets['0'].fileName,
            type: response.assets['0'].type,
            uri:
              Platform.OS === 'android'
                ? response.assets['0'].uri
                : response.assets['0'].uri.replace('file://', ''),
          };
          const formData = new FormData();
          formData.append('image', file);
          const headers = {
            'Content-Type': 'multipart/form-data',
          };
          api({token: user.token})
            .get('foo', formData, {headers})
            .then(async ({data}) => {
              setUserAvatar(filePath.uri)
            })
            .catch(error => {
              console.log(error);
            });
          setUserAvatar(response.assets['0'].uri);
        }
      });
    }
  };

  return (
    <>
      <View className={'bg-white h-full p-4 pt-4'}>
        <View className={'items-center w-full bg-white'}>
          <Avatar
            rounded
            size="large"
            source={{
              uri: userAvatar,
            }}
          />
          <FAB
            icon={{
              name: 'camera-alt',
              size: 25,
              color: 'white',
            }}
            onPress={() => {
              chooseFile();
            }}
            color={'#cdcdcd'}
          />
          <Text className={'text-gray-500 text-lg'}>{user.name}</Text>
          <Text className={'text-gray-500 text-lg'}>{user.email}</Text>
        </View>

        <View className={'mt-5'}>
          <Button onPress={() => logOut()} title="Cerrar Sesión">
            <Icon name="logout" color="white" />
            Cerrar Sesión
          </Button>
        </View>
      </View>
    </>
  );
};

export default PerfilScreen;
