package com.util;

import com.iflytek.cloud.speech.*;
import org.junit.Before;
import org.junit.Test;

/**
 * Created by Administrator on 2017/4/13.
 */

public class VoiceTest {

    @Before
    public void setProperty(){
        SpeechUtility.createUtility(SpeechConstant.APPID+"=58eef52b") ;
    }


    @Test
    public void speachSynthesizer(){

        //创建对象
        SpeechSynthesizer speechSynthesizer = SpeechSynthesizer.createSynthesizer();

        speechSynthesizer.setParameter(SpeechConstant.VOICE_NAME,"xiaoyan");
        speechSynthesizer.setParameter(SpeechConstant.SPEED,"50");
        speechSynthesizer.setParameter(SpeechConstant.VOLUME,"80");
        speechSynthesizer.setParameter(SpeechConstant.TTS_AUDIO_PATH,"./tts.pcm");

        speechSynthesizer.startSpeaking("我的测试语音", new SynthesizerListener() {
            //
            public void onBufferProgress(int i, int i1, int i2, String s) {

            }

            //播放开始
            public void onSpeakBegin() {
                System.out.println("开始播放");
            }

            //播放进程
            public void onSpeakProgress(int i, int i1, int i2) {

            }

            public void onSpeakPaused() {

            }

            public void onSpeakResumed() {

            }

            public void onCompleted(SpeechError speechError) {
                //播放完成
            }

            public void onEvent(int i, int i1, int i2, int i3, Object o, Object o1) {
                System.out.println("播放完成");
            }
        });


    }


}
