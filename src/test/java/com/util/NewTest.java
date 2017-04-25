package com.util;

import org.junit.Test;

import java.util.Scanner;

/**
 * Created by Administrator on 2017/4/25.
 */
public class NewTest {

    @Test
    public void test(){
        int n,m;
        n=12;
        if(n%2==0)m=n;
        else m=n+1;
        int a=1,b=1,index=1,loop=0;
        for(int i=1;i<=(m-1)*(m/2);i++){
            if(a>=m)a=1;
            if(index>m/2)index=1;
            if(index==1){
                loop++;
                if(i==1){
                    b=m;
                }else{
                    b=a;
                }
                System.out.println("第"+loop+"轮");
                if(((i-1)/(m/2)%2)==0){
                    System.out.println(a+"----"+m);
                }else{
                    System.out.println(m+"---"+a);
                }
            }else if(index>1&&index<=m/2){
                if(b>1)b--;
                else b=m-1;
                System.out.println(a+"---"+b);
            }
            index++;
            a++;
        }
    }

}
