package com.editor.common.realm;

import org.apache.shiro.authc.*;
import org.apache.shiro.authc.credential.PasswordService;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;

/**
 * Created by heren on 2016/10/23.
 */
public class SystemRealm extends AuthorizingRealm {


    public PasswordService getPasswordService() {
        return passwordService;
    }

    public void setPasswordService(PasswordService passwordService) {
        this.passwordService = passwordService;
    }

    private PasswordService passwordService ;


    //认证
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principalCollection) {
        SimpleAuthorizationInfo simpleAuthorizationInfo = new SimpleAuthorizationInfo() ;
        return simpleAuthorizationInfo;
    }



    //认证
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authenticationToken) throws AuthenticationException {
        UsernamePasswordToken usernamePasswordToken = (UsernamePasswordToken)authenticationToken ;
        System.out.println(usernamePasswordToken.getUsername());
        System.out.println(usernamePasswordToken.getPassword());
        SimpleAuthenticationInfo authenticationInfo = new SimpleAuthenticationInfo(usernamePasswordToken.getUsername(),passwordService.encryptPassword(usernamePasswordToken.getPassword()),this.getName()) ;
        return authenticationInfo ;
    }


}
