package com.editor.common.realm;

import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.credential.HashedCredentialsMatcher;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.crypto.hash.Md5Hash;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;

/**
 * Created by heren on 2016/10/24.
 */
public class HashSystemRealm extends AuthorizingRealm {



    public HashSystemRealm() {
        HashedCredentialsMatcher hashedCredentialsMatcher = new HashedCredentialsMatcher() ;
        hashedCredentialsMatcher.setStoredCredentialsHexEncoded(true);
        hashedCredentialsMatcher.setHashIterations(1024);
        hashedCredentialsMatcher.setHashAlgorithmName(Md5Hash.ALGORITHM_NAME);
        this.setCredentialsMatcher(hashedCredentialsMatcher);
    }

    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {
        return null;
    }

    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
        return null;
    }


    //@Inject
    //private Provider<UserDictFacade> userDictFacadeProvider ;
    //
    //@Override
    //protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principalCollection) {
    //
    //    SimpleAuthorizationInfo authorizationInfo = new SimpleAuthorizationInfo() ;
    //    String userName = (String)getAvailablePrincipal(principalCollection);
    //    UserDictFacade userDictFacade = userDictFacadeProvider.get();
    //    Cache cacheInfo = com.mheath.common.util.CacheManager.getCacheInfo(userName + "_orgInfo");
    //    OrgDict orgDict = (OrgDict)cacheInfo.getValue();
    //    //添加字符串权限
    //    List<PermissionDict> permissionDicts = userDictFacade.findPermissionByUserAndOrg(userName,orgDict) ;
    //    Iterator<PermissionDict> iterator = permissionDicts.iterator();
    //    while(iterator.hasNext()){
    //        authorizationInfo.addStringPermission(iterator.next().getPermission());
    //    }
    //
    //    //添加角色
    //    List<RoleDict> roleDicts = userDictFacade.getUserRoleByUserNameAndOrg(userName,orgDict) ;
    //    Iterator<RoleDict> roleDictIterator = roleDicts.iterator();
    //    while (roleDictIterator.hasNext()){
    //        RoleDict roleDict = roleDictIterator.next() ;
    //        authorizationInfo.addRole(roleDict.getRoleName());
    //    }
    //
    //    return authorizationInfo;
    //}
    //
    //@Override
    //protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authenticationToken) throws AuthenticationException {
    //    UserDictFacade userDictFacade = userDictFacadeProvider.get() ;
    //    String userName = (String)authenticationToken.getPrincipal() ;
    //    UserDict userDict = userDictFacade.findByUserName(userName) ;
    //    if(userDict==null){
    //        throw new UnknownAccountException() ;
    //    }else{
    //        SimpleAuthenticationInfo authenticationInfo = new SimpleAuthenticationInfo(authenticationToken.getPrincipal(),userDict.getPassword(), ByteSource.Util.bytes(authenticationToken.getPrincipal()+userDict.getSalt()), getName()) ;
    //        return authenticationInfo;
    //    }
    //}

}
