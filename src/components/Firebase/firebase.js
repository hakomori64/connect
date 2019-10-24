import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/storage';


const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
};

class Firebase {
    constructor() {
        app.initializeApp(config);
        this.auth = app.auth();
        this.store = app.firestore();
        this.storage = app.storage();
        this.getUserInfo.bind(this);
    }

    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

    onAuthUserListener = (next, fallback) =>
        this.auth.onAuthStateChanged(authUser => {
            if (authUser) {
                this.getUserInfo(next, fallback)(authUser.uid);
            } else {
                fallback();
            }
        });

    getUserInfo = (next, fallback) => user_id => {
        const user_ref = this.store.collection('users').doc(user_id);
        user_ref.get().then(doc => {
            if (doc.exists) {
                let user_info = {};
                const icon_ref = this.storage.ref(`users/${user_id}/icon`);
                icon_ref.getDownloadURL().then(url => {
                    user_info = doc.data();
                    user_info.icon_url = url;
                    user_info.have_want_set = {};
                    user_ref.collection('have_want_set').onSnapshot(querySnapshot => {
                        querySnapshot.forEach(have_want_set_ref => {
                            user_info.have_want_set[have_want_set_ref.id] = have_want_set_ref.data();
                        });
                        next(user_info);
                    });
                }).catch(error => {
                    if (error.code === 'storage/object-not-found') {
                        const icon_ref = this.storage.ref('users/default.png');
                        icon_ref.getDownloadURL().then(url => {
                            user_info = doc.data();
                            user_info.icon_url = url;
                            user_ref.collection('have_want_set').onSnapshot(querySnapshot => {
                                querySnapshot.forEach(have_want_set_ref => {
                                    console.log(user_info.have_want_set);
                                    console.log(have_want_set_ref.data());
                                    if(user_info.have_want_set ){
                                        user_info.have_want_set = {};
                                    }
                                    user_info.have_want_set = {
                                        ...user_info.have_want_set,
                                        [have_want_set_ref.id]: have_want_set_ref.data(),
                                    };
                                });
                                next(user_info);
                            });
                        });
                    }
                });
            } else {
                fallback();
            }
        })
    }
}

export default Firebase;
