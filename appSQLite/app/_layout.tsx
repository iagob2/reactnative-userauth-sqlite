import { Stack } from 'expo-router/stack';
import { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Crud } from '../banco/crud';
import { colors } from '../style/theme';

export default function Layout() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initDatabase = async () => {
      try {
        await Crud();
      } catch (error) {
        console.error('Erro ao inicializar banco de dados:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initDatabase();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return <Stack />;
}