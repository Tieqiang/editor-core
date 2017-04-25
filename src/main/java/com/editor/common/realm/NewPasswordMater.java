package com.editor.common.realm;

import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.credential.PasswordMatcher;

/**
 * Created by heren on 2016/10/23.
 */
public class NewPasswordMater extends PasswordMatcher {



    public NewPasswordMater() {
        super();
        System.out.println("我被创建了");
    }

    @Override
    public boolean doCredentialsMatch(AuthenticationToken token, AuthenticationInfo info) {
        System.out.println("认证的地方");
        System.out.println("日了狗了");
        return true ;
    }


}
