import AsyncStorage from '@react-native-async-storage/async-storage';
import WalletConnectProvider, {
  useWalletConnect,
} from '@walletconnect/react-native-dapp';
import { ethers } from 'ethers';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useCallback } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { IAsyncStorage } from './AsyncStorage';

const HandleWalletConnect = () => {
  const connector = useWalletConnect();

  const connectWallet = useCallback(() => {
    if (connector && !connector.connected) {
      return connector.connect();
    }
    return null;
  }, [connector?.connect]);

  return <Button title='Wallet connect' onPress={connectWallet} />;
};

export default function App() {
  const [blockNumber, setBlockNumber] = useState<string>('');

  useEffect(() => {
    (async () => {
      try {
        const provider = new ethers.providers.JsonRpcProvider();
        console.log(await provider.ready);
        const block = await provider.getBlockNumber();
        const res = await provider.getBlock(block);
        setBlockNumber(JSON.stringify(res));
      } catch (e) {
        console.log(e.message);
      }
    })();
  }, []);

  return (
    <WalletConnectProvider
      redirectUrl={`wmw://app`}
      storageOptions={{
        asyncStorage: AsyncStorage as unknown as IAsyncStorage,
      }}
    >
      <View style={styles.container}>
        <HandleWalletConnect />
        <Text>Current Block Number</Text>
        <Text>{blockNumber}</Text>
        <StatusBar style='auto' />
      </View>
    </WalletConnectProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
