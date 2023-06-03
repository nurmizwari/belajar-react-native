/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import {
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  FlatList,
  Alert,
  ToastAndroid,
  BackHandler,
  PermissionsAndroid,
  ActivityIndicator,
  Dimensions,
  Linking,
  RefreshControl,
  ImageBackground,
} from 'react-native';

function App(): JSX.Element {
  const [name, setName] = useState<String>('nur mizwari');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [toast, setToast] = useState('');

  const handleLogin = () => {
    // Logic untuk login, misalnya mengirim data ke server
    console.log('Email:', email);
    console.log('Password:', password);
  };

  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to go back?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);

  const showToast = () => {
    ToastAndroid.showWithGravity(
      'Telah di tekan',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };

  //! PERMISSION ANDROID
  // note harus ditambahkan di main nya setingan lagi misal CAMERA
  const requestCameraPermission = async () => {
    console.log('klikk');

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  //! DIMENSIONS

  const height = Dimensions.get('window').height;
  const width = Dimensions.get('window').width;

  //! REFRESH CONTROLL
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      console.log('telah di refreshh');
    }, 2000);
  }, []);

  //! IMAGE BACKGROUND
  const image = {uri: 'https://reactjs.org/logo-og.png'};

  return (
    <SafeAreaView style={styles.contai}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View
          style={{
            width: '100%',
            height: 50,
            backgroundColor: 'red',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 3,
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 20,
            }}>
            <Text style={{fontSize: 20}}>Home</Text>
            <Text style={{fontSize: 20}}>Login</Text>
            <Text style={{fontSize: 20}}>Register</Text>
          </View>
        </View>

        <View
          style={{
            // marginTop: 20,
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            // display: 'flex',
            padding: 10,
            flex: 1,
          }}>
          <Image
            source={require('./image/baso5.png')}
            style={{
              width: '90%',
              height: height / 4,
              borderRadius: 24,
              resizeMode: 'cover',
            }}
          />
          <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>{name}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={text => setEmail(text)}
            value={email}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            onChangeText={text => setPassword(text)}
            value={password}
          />
          <Button title="Login" onPress={handleLogin} />
        </View>
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={text => setEmail(text)}
            value={email}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            onChangeText={text => setPassword(text)}
            value={password}
          />
          <Button title="Login" onPress={handleLogin} />
        </View>

        {/* <View>
          <FlatList //! untuk me looping data
            data={DATA}
            renderItem={({item}) => <Text> {item.title}</Text>}
            keyExtractor={item => item.id}
          />
        </View> */}
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              Alert.alert('Perhatian', 'Lanjutkan ke halaman ini ?', [
                {
                  text: 'Ask me later',
                  onPress: () => console.log('Ask me later pressed'),
                },
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ])
            }>
            <Text>Tekan Untuk Alert</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.button}
            onPress={requestCameraPermission}>
            <Text>Tekan Untuk CAMERA PERMISSION</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => Linking.openURL('https://google.com')}>
            <Text>Linking Google</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.container2}>
          <ImageBackground
            source={image}
            resizeMode="cover"
            style={styles.image}>
            <Text style={styles.text2}>NUR MIZWARI</Text>
          </ImageBackground>
        </View>
        <ActivityIndicator size="large" color="#0000ff" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  container2: {
    flex: 2,
    justifyContent: 'center',
    padding: 16,
    borderRadius: 24,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'red',
    padding: 10,
    width: '100%',
    height: 60,
    marginTop: 10,
    elevation: 5,

    // borderRadius: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  scrollView: {
    // backgroundColor: 'pink',
  },
  contai: {
    flex: 1,
  },
  text2: {
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    // backgroundColor: '#000000c0',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    borderRadius: 20,
  },
});

export default App;
