import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { selectUsuarios, buscarUsuarioPorEmail } from '../banco/crud';
import { globalStyles, colors } from '../style/theme';

interface Usuario {
  id: number;
  nome: string;
  email: string;
  senha: string;
}

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = useCallback(async () => {
    if (!email || !senha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos!');
      return;
    }

    setLoading(true);
    try {
      const usuario = await buscarUsuarioPorEmail(email) as Usuario[];
      
      if (!usuario || usuario.length === 0) {
        Alert.alert('Erro', 'Usuário não encontrado');
        return;
      }

      if (usuario[0].senha !== senha) {
        Alert.alert('Erro', 'Senha incorreta');
        return;
      }

      Alert.alert('Sucesso', 'Login realizado com sucesso!', [
        {
          text: 'OK',
          onPress: () => {
            setEmail('');
            setSenha('');
            router.push('/mostrarUsuario');
          },
        },
      ]);
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      Alert.alert('Erro', 'Não foi possível realizar o login');
    } finally {
      setLoading(false);
    }
  }, [email, senha]);

  if (loading) {
    return (
      <View style={[globalStyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Login</Text>
      
      <TextInput
        style={globalStyles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={globalStyles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <TouchableOpacity style={globalStyles.button} onPress={handleLogin}>
        <Text style={globalStyles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[globalStyles.button, { marginTop: 10, backgroundColor: colors.secondary }]}
        onPress={() => router.push('/')}
      >
        <Text style={globalStyles.buttonText}>Não tem uma conta? Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
} 