import Head from 'next/head';
import styles from '../styles/Home.module.css';
import View from '../components/View';
import RecordsTable from '../components/RecordsTable';

export default function Records() {
  return (
    <View title="Records">
        <RecordsTable />
    </View>
  );
}