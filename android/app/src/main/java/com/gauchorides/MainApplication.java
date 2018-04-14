package com.gauchorides;


import android.app.Application;
import android.content.Intent;

import com.magus.fblogin.FacebookLoginPackage;
import com.reactnativenavigation.bridge.NavigationReactPackage;

import com.facebook.FacebookSdk;
import com.facebook.CallbackManager;

import com.facebook.react.ReactApplication;


import io.invertase.firebase.RNFirebasePackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.arttitude360.reactnative.rngoogleplaces.RNGooglePlacesPackage;

import com.oblador.vectoricons.VectorIconsPackage;

import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {
  private static CallbackManager mCallbackManager = CallbackManager.Factory.create();
  private static final String EMAIL = "email";

  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }
    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new RNFirebasePackage(),
          new NavigationReactPackage(),
          new FacebookLoginPackage(),
          new FBSDKPackage(mCallbackManager),
          new VectorIconsPackage()

      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    FacebookSdk.sdkInitialize(getApplicationContext());
  }
}
