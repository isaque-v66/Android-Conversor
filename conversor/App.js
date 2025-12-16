import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button } from './src/components/Button';
import { styles } from './app.styles';
import { currencies } from './src/constants/currencies';
import { Input } from './src/components/Input';
import { ResultCard } from './src/components/resultCard';
import { exchangeRateApi } from './src/services/api';
import { useState } from 'react';
import { convertCurrency } from './src/services/api';


export default function App() {

  const [amount, setAmount] = useState('')
  const [fromCurrency, setFromCurrency] = useState('USD')
  const [toCurrency, setToCurrency] = useState('BRL')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [exchangeRate, setExchangeRate] = useState(null)


  async function fetchExchangeRate(){
    const data = await exchangeRateApi(fromCurrency)
    const rate = data.rates[toCurrency]
    const convertedAmount = convertCurrency(amount, rate)
    setResult(convertedAmount)

  }


  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

    <ScrollView style={styles.scrollView}>

        <View style={styles.content}>
          <StatusBar style="auto" />

            <View style={styles.header}>
              <Text style={styles.title}>Conversor de Moedas</Text>
              <Text style={styles.subtitle}>Converta valores entre diferentes moedas</Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.label}>De:</Text>

              <View style={styles.currencyGrid}>
                {currencies.map(currency => (
                  <Button key={currency.code} variant='primary'currency={currency} onPress={()=> setFromCurrency(currency.code)} isSelected={fromCurrency === currency.code}/>
                ) )}

              </View>
                <Input label="Valor: " value={amount} onChangeText={setAmount}/>

                <TouchableOpacity style={styles.swapButton}>
                  <Text style={styles.swapButtonText}>
                    ↑↓
                  </Text>
                </TouchableOpacity>

                <Text style={styles.label}>Para: </Text>
                <View style={styles.currencyGrid}>
                    {currencies.map(currency => (
                      <Button onPress={()=> setToCurrency(currency.code)} key={currency.code} variant='secondary'currency={currency} isSelected={toCurrency === currency.code}/>
                    ))}
                </View>
            </View>

            <TouchableOpacity onPress={fetchExchangeRate} style={styles.convertButton}>
              <Text style={styles.swapButtonText}>
                Converter
              </Text>
            </TouchableOpacity>

            <ResultCard />


        </View>
         </ScrollView>
    </KeyboardAvoidingView>
  );
}

