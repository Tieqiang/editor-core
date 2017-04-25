package com.editor.common.modual;

import com.google.inject.Singleton;
import com.google.inject.name.Names;
import com.editor.common.realm.HashSystemRealm;
import org.apache.shiro.authc.credential.CredentialsMatcher;
import org.apache.shiro.authc.credential.HashedCredentialsMatcher;
import org.apache.shiro.crypto.hash.Md5Hash;
import org.apache.shiro.guice.web.ShiroWebModule;
import org.apache.shiro.realm.Realm;

import javax.servlet.ServletContext;

/**
 * Created by heren on 2016/10/30.
 */
public class ShiroModul extends ShiroWebModule {




    public ShiroModul(ServletContext servletContext) {
        super(servletContext);
    }

    @Override
    protected void configureShiroWeb() {
        bindRealm().to(HashSystemRealm.class).in(Singleton.class);
        bindConstant().annotatedWith(Names.named("shiro.usernameParam")).to("username");
        bindConstant().annotatedWith(Names.named("shiro.passwordParam")).to("password");
        bindConstant().annotatedWith(Names.named("shiro.loginUrl")).to("/index.html");
        bindConstant().annotatedWith(Names.named("shiro.successUrl")).to("/index.html");
        bindConstant().annotatedWith(Names.named("shiro.failureKeyAttribute")).to("failureKeyAttribute");

        addFilterChain("/static/**", ANON);
        addFilterChain("/js/**",ANON);
        addFilterChain("/style/**",ANON);
        addFilterChain("/index.html",ANON);
        addFilterChain("/regist.html",ANON);
        addFilterChain("/api/regist/**",ANON);//注册服务不需进行过滤
        addFilterChain("/api/login/**",ANON);//登陆页面不需要

        addFilterChain("/**",AUTHC);
        addFilterChain("/success.html",AUTHC);
        addFilterChain("/api/**",AUTHC);
    }



    //@Provides
    public Realm provideRealm(){
        HashSystemRealm hashSystemRealm = new HashSystemRealm();
        HashedCredentialsMatcher hashedCredentialsMatcher = new HashedCredentialsMatcher() ;
        hashedCredentialsMatcher.setStoredCredentialsHexEncoded(true);
        hashedCredentialsMatcher.setHashIterations(1024);
        hashedCredentialsMatcher.setHashAlgorithmName(Md5Hash.ALGORITHM_NAME);
        hashSystemRealm.setCredentialsMatcher(hashedCredentialsMatcher);
        return hashSystemRealm ;
    }

    //@Provides
    //需要研究google guice 的Provides方法
    public CredentialsMatcher provideMatcher(){
        HashedCredentialsMatcher hashedCredentialsMatcher = new HashedCredentialsMatcher() ;
        hashedCredentialsMatcher.setStoredCredentialsHexEncoded(true);
        hashedCredentialsMatcher.setHashIterations(1024);
        hashedCredentialsMatcher.setHashAlgorithmName(Md5Hash.ALGORITHM_NAME);
        return hashedCredentialsMatcher ;
    }
}
