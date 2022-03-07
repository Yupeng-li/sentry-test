import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import * as Sentry from '@sentry/react-native';
import { throwError } from './throwError'
import { wrapInnerErrorAndThrow } from './wrapInnerErrorAndThrow'

//TODO Replace this to your DSN
const SENTRY_INTERNAL_DSN = 'https://your-sentry-dsn';

Sentry.init({
  // Replace the example DSN below with your own DSN:
  dsn: SENTRY_INTERNAL_DSN,
  debug: true,
  maxBreadcrumbs: 150, // Extend from the default 100 breadcrumbs.
  integrations: [
    new Sentry.ReactNativeTracing({
      idleTimeout: 5000, // This is the default timeout
      tracingOrigins: ['localhost', /^\//, /^https:\/\//],
    }),
  ],
  enableAutoSessionTracking: true,
  // For testing, session close when 5 seconds (instead of the default 30) in the background.
  sessionTrackingIntervalMillis: 5000,
  // This will capture ALL TRACES and likely use up all your quota
  tracesSampleRate: 1.0,
  // Sets the `release` and `dist` on Sentry events. Make sure this matches EXACTLY with the values on your sourcemaps
  // otherwise they will not work.
  release: 'sentry-test@1.0.0',
  dist: `1.0.0`,
});

function callFunctionAndReportError(func: ()=>void){
  try{
    func()
  }catch (error){
    Sentry.captureException(error)
  }
}

function App() {
  return (
    <View style={styles.container}>
      <Button title="Throw an error" onPress={()=>callFunctionAndReportError(throwError)}/>
      <Button title="Throw an error with cause" onPress={()=>callFunctionAndReportError(wrapInnerErrorAndThrow)}/>
      <StatusBar style="auto" />
    </View>
  );
}

export default Sentry.wrap(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
