import Head from 'next/head';
import styles from '../styles/Home.module.css';
import View from '../components/View';
import CategoryTable from '../components/CategoryTable';

export default function Categories() {
  return (
    <View title="Categories">
        <CategoryTable />
    </View>
  );
}