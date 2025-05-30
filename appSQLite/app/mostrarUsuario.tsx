import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import { deleteUsuario, insertUsuario, selectUsuarios, updateUsuario } from '../banco/crud';
import { globalStyles, colors } from '../style/theme';

interface Usuario {
  id: number;
  nome: string;
  email: string;
  senha: string;
}

export default function MostrarUsuario() {
  const [modoEdicao, setModoEdicao] = useState(false);
  const [idEditando, setIdEditando] = useState<number | null>(null);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);

  const exibirUsuarios = useCallback(async () => {
    try {
      const dados = await selectUsuarios();
      setUsuarios(dados);
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
      Alert.alert('Erro', 'Não foi possível carregar os usuários');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    const carregarDados = async () => {
      if (mounted) {
        await exibirUsuarios();
      }
    };

    carregarDados();

    return () => {
      mounted = false;
    };
  }, [exibirUsuarios]);

  const delUsuario = useCallback(async (id: number) => {
    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza que deseja excluir este usuário?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteUsuario(id);
              await exibirUsuarios();
            } catch (error) {
              console.error('Erro ao excluir usuário:', error);
              Alert.alert('Erro', 'Não foi possível excluir o usuário');
            }
          },
        },
      ]
    );
  }, [exibirUsuarios]);

  const salvarUsuario = useCallback(async () => {
    if (!nome || !email || !senha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos!');
      return;
    }

    try {
      if (modoEdicao && idEditando !== null) {
        await updateUsuario(idEditando, nome, email, senha);
      } else {
        await insertUsuario(nome, email, senha);
      }

      setNome('');
      setEmail('');
      setSenha('');
      setModoEdicao(false);
      setIdEditando(null);
      await exibirUsuarios();
    } catch (error) {
      console.error('Erro ao salvar usuário:', error);
      Alert.alert('Erro', 'Não foi possível salvar o usuário');
    }
  }, [nome, email, senha, modoEdicao, idEditando, exibirUsuarios]);

  const editUsuario = useCallback((item: Usuario) => {
    setNome(item.nome);
    setEmail(item.email);
    setSenha(item.senha);
    setModoEdicao(true);
    setIdEditando(item.id);
  }, []);

  if (loading) {
    return (
      <View style={[globalStyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={[globalStyles.container, styles.container]}>
      <Text style={[globalStyles.title, styles.title]}>
        {modoEdicao ? 'Editar Usuário' : 'Lista de Usuários'}
      </Text>

      {modoEdicao && (
        <View style={styles.formContainer}>
          <TextInput
            style={[globalStyles.input, styles.input]}
            placeholder="Nome"
            value={nome}
            onChangeText={setNome}
          />

          <TextInput
            style={[globalStyles.input, styles.input]}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={[globalStyles.input, styles.input]}
            placeholder="Senha"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
          />

          <View style={styles.buttonGroup}>
            <TouchableOpacity 
              style={[globalStyles.button, styles.saveButton]} 
              onPress={salvarUsuario}
            >
              <Text style={globalStyles.buttonText}>
                {modoEdicao ? 'Atualizar' : 'Cadastrar'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[globalStyles.button, styles.cancelButton]} 
              onPress={() => {
                setModoEdicao(false);
                setIdEditando(null);
                setNome('');
                setEmail('');
                setSenha('');
              }}
            >
              <Text style={globalStyles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <FlatList
        data={usuarios}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={[globalStyles.userCard, styles.userCard]}>
            <View style={styles.userInfoContainer}>
              <Text style={[globalStyles.userInfo, styles.userInfo]}>Nome: {item.nome}</Text>
              <Text style={[globalStyles.userInfo, styles.userInfo]}>Email: {item.email}</Text>
            </View>
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={[globalStyles.editButton, styles.actionButton]}
                onPress={() => editUsuario(item)}
              >
                <Text style={globalStyles.buttonText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[globalStyles.deleteButton, styles.actionButton]}
                onPress={() => delUsuario(item.id)}
              >
                <Text style={globalStyles.buttonText}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    marginBottom: 24,
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  input: {
    marginBottom: 12,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  saveButton: {
    flex: 1,
    marginRight: 8,
    backgroundColor: colors.primary,
  },
  cancelButton: {
    flex: 1,
    marginLeft: 8,
    backgroundColor: '#666',
  },
  userCard: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  userInfoContainer: {
    marginBottom: 12,
  },
  userInfo: {
    fontSize: 16,
    marginBottom: 4,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  listContainer: {
    paddingBottom: 16,
  },
});