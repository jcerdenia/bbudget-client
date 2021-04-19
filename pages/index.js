import Head from 'next/head';
import styles from '../styles/Home.module.css';
import View from '../components/View';
import LoginForm from '../components/LoginForm'

export default function Home() {
  return (
    <View title="Log In">
      <LoginForm />
    </View>
  );
}