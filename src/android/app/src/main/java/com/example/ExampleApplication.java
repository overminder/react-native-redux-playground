package com.example;

import android.app.Application;
import android.os.Build;
import android.webkit.WebView;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.github.alinz.reactnativewebviewbridge.WebViewBridgePackage;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class ExampleApplication extends Application implements ReactApplication {
    private final ReactNativeHost mHost = new ReactNativeHost(this) {
        @Override
        protected boolean getUseDeveloperSupport() {
            return true;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
                    new WebViewBridgePackage()
            );
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
            WebView.setWebContentsDebuggingEnabled(true);
        }
    }
}
