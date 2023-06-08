import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,onAuthStateChanged, UserCredential } from "firebase/auth";
import { httpsCallable,getFunctions, HttpsCallableResult,connectFunctionsEmulator } from "firebase/functions";
// import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
import { onMessage } from "firebase/messaging";
import { getMessaging, onBackgroundMessage } from "firebase/messaging/sw";

const firebaseConfig = {
  apiKey: "AIzaSyBdXT47g8fYnMPT9wCNL5h7sEHniN5yTd4",
  authDomain: "plexiform-being-384211.firebaseapp.com",
  projectId: "plexiform-being-384211",
  storageBucket: "plexiform-being-384211.appspot.com",
  messagingSenderId: "824833644826",
  appId: "1:824833644826:web:0335d1e70ccfcbf11974a3"
};
/*
{
  "type": "service_account",
  "project_id": "plexiform-being-384211",
  "private_key_id": "9471b6b18c45bc3701b39f1ef4a27600bf3876a7",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDNndQJqti4FC1g\nZt7hJJFt1qv+5xPDbLzE4VslHP2a+iKDvXrUQS09wnceAObVt/OmeAE1548ksb3M\nghKhHPpp/GoBSHER6W9UVxADXevcN1wJAWlMwurFny8IIRsoKB7Mao2Y22qA4isa\nyQy9+oOHNpUclvuVbyH52ruNntmSBwIeWoZAI91FAEuO9Cj92gJm00QHT5VBXia/\n1Mb9NCRHNXSoDTJHSzl1RA+Kr3Bf+yrVElqTBaJ/yptBhaTOCAhknAjZDt5iS0Jc\nGoFKujexZV+Tv7aVasHF0R7I0TZDuS9QS1YXkPUTO7p+j+b9aVzyPRz1skKHGtgn\nPnr0K163AgMBAAECggEABhYbROWz90ZiMlSJNR/j6Uqkh7beWmUwPiGvlOze+cTG\nJKEp3LAkWp4mpzcQ507EAe+J3sccJ/cfN6UDdJXdOJd+8u/F8aAA84/zU8B45eld\n4Ual6zn7QPECHS1GRHHR3dorBPnO3i/vHEcUPx8Ylyz2g2k0/68s9lxTFxFNdUT9\ng9uCMcj9D+4ooONm0yzOnfYDijsa1POgyLisx5/iBWRQXgbZzBUfknhIWglsZjBK\n/EyXAHwssWj7t2R1KfxTh5JKQUVQ3eBRJRNg1M67v36JNINZS46lCdX9MCI27pgE\nG/QfMY9WxUt4SQkK5uSf1P/z/h++eBlVtZbEL5LAAQKBgQD0G6uqrqNxVAfXsczU\nhtE+YqIIdcdb4SDu/uiWInGU7tNmrehuJWug9Zo1ACIJqCD7l7KUqzf3MHwuJYw0\nyLFSf5TuFLbqZJlBy8+A8de/Ke/rdIoQ20AZkLRv8hG8M2nrko6Kf+Z656ZwTzGc\nwf0mt4BfLj2ghQrCdpEKCLCetwKBgQDXoh7IxZzQYFZnJsajcct6KCKYEisKRFMe\n9HNNdeZD4eHzH+wjp426xMZo3nRO7lsvK8jjtb8+J8Akr+Rc8z3789mvUlr4WUXO\n3+k/WEEGXCf28qyU0espF2NpjRszo6djt9M/VC5cCV9yjkhFDmttlMsINxza9i8G\n96iFrZtAAQKBgQDm3dynmm9d2Vlpd/D+91qiI+qXEb0wemUJY/BZPc4qSw2IyOVQ\ndvepzV7AzZVjiK1ZBYmR7bUKhcKMalqF+WErYxpZaSHt4KLJhZaEnzWqyGDuUNPb\nSWEATMk6LrjzQ7TjZUKGXpx+lOPmyB9l4Fop6dbxLex/ChS5AiX+VWWlVQJ/JQ+4\nOsm8KhRkxVXkzjLAxj4ftANrYlhb8PYS2z1oVkJ8k0zpSTeDJJatg1i4pNhS08iy\nvnB+bjBm1edlWJR2EtfWkkuVVxoA5Y2WiUyh4HX2aHtNLkbmJCng7ENUaYu3OWxe\n4oOVdDwoK4hI45WW4T6xprfSPdASRSBL1q4AAQKBgQC3R0Ci+V75TDbAXG/0DFZY\nkv5gpalPIikxExCx6lzPs6GemN2puRHNRMbye/ViFedTK0tHx/0dOX1lr+jZTb1l\nhXLHVZgLVwKF/N7Wn4YA0pbNnVYZU9nu3jMzYxbIWhM6CPhBEyZxCpS9iPCSYjEx\ny2JsfUfR+h1fFOTU62tVXA==\n-----END PRIVATE KEY-----\n",
  "client_email": "cfunctions-sav@plexiform-being-384211.iam.gserviceaccount.com",
  "client_id": "112537694437354177301",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/cfunctions-sav%40plexiform-being-384211.iam.gserviceaccount.com"
}
*/
const VAPID_KEY='BHz75Cb3bXUrCclCFNCrIlaLkvI8TX37MvM7aqT1w9k9pvbIi5Y0yrwULUM_yjoJz9FYXmmd1CleNvDwt9lIxk0'
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  public functionsInstance:any;
  public auth:any;
  public db:any;
  public app:any;
  public messaging:any;
  public isloading:boolean;
  public transferts:any[]=[];
  public transactions:any[]=[];
  constructor() {
    this.isloading=false;
    this.app = initializeApp(firebaseConfig);
    this.auth = getAuth(this.app);

    this.db = getFirestore(this.app);

    this.functionsInstance= getFunctions(this.app)
    // connectFunctionsEmulator(this.functionsInstance, "localhost", 5001);
    console.log(this.functionsInstance);
    this.messaging = getMessaging(this.app);
    console.log(this.messaging);
    this.getMessageToken()
  }
  getMessageToken():void{
    onMessage(this.messaging, (payload) => {
      console.log('Message received. ', payload);
      // ...
    });
    onBackgroundMessage(this.messaging, (payload) => {
      console.log('[firebase-messaging-sw.js] Received background message ', payload);
      // Customize notification here
      const notificationTitle = 'Background Message Title';
      const notificationOptions = {
        body: 'Background Message body.',
        icon: '/firebase-logo.png'
      };

    });

    // getToken(this.messaging, { vapidKey: VAPID_KEY }).then((currentToken) => {
    //   if (currentToken) {
    //     console.log('@@@@@@@@@@@@@@@@@@@@@@@@@ currentToken>>> ', currentToken);

    //     // Send the token to your server and update the UI if necessary
    //     // ...
    //   } else {
    //     // Show permission request UI
    //     console.log('No registration token available. Request permission to generate one.');
    //     // ...
    //   }
    // }).catch((err) => {
    //   console.log('An error occurred while retrieving token. ', err);
    //   // ...
    // });
  }
  public signIn(form: any): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.auth, form?.email , form?.password);
  }
  public signOut(): Promise<void> {
    return signOut(this.auth);
  }
  public logIn(form: any): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, form?.email , form?.password);
  }
  public  callFunction(function_name: string , data:any) : Promise<HttpsCallableResult<any>>{
    console.log(`@@@@@@@@@@@@@@@@@@@@@ call function ${function_name} with data:\n `)
    console.log(data);

    this.isloading=true;
    return  httpsCallable(this.functionsInstance,function_name)(data).finally(() => {
      console.log("@@@@@@@@@@@@@@@@@@@@@finished")
      this.isloading=false;
    });
  }
}
