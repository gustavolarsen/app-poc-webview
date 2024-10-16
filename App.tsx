import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview'; // Importando o tipo
import { Camera } from 'expo-camera';

export default function App() {
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const requestCameraPermission = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === 'granted');
      setIsLoading(false); // Atualiza o estado de carregamento após solicitar permissão
    };

    requestCameraPermission();
  }, []);

  if (isLoading) {
    return (
      <ActivityIndicator
        size="large"
        color="#0000ff"
      />
    );
  }

  if (hasCameraPermission === false) {
    return <Text>Permissão de câmera negada.</Text>;
  }

  return (
    <View style={styles.container}>
      <WebView
        source={{
          uri: 'https://gentle-wave-0f628b70f-preview.eastus2.5.azurestaticapps.net/'
        }}
        style={{ flex: 1 }}
        mediaPlaybackRequiresUserAction={false} // Permitir reprodução de mídia sem ação do usuário
        onMessage={(event) => console.log(event.nativeEvent.data)}
        onPermissionRequest={(request: any) => {
          if (request.resources.includes('android.webkit.resource.VIDEO_CAPTURE')) {
            request.grant(request.resources); // Conceder permissão de captura de vídeo
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50
  }
});
