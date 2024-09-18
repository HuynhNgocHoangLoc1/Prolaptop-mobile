import { StyleSheet, Text, View } from 'react-native';
import NavigationApp from './navigation/NavigationApp';
import { AuthProvider } from './contexts/AccountContext';

export default function App() {
  return (
    <AuthProvider>
      <NavigationApp />
    </AuthProvider>
  );
}
const styles = StyleSheet.create({
});
