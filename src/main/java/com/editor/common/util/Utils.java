package com.editor.common.util;

import java.io.File;
import java.io.IOException;
import java.io.RandomAccessFile;

/**
 * Created by Administrator on 2017/4/13.
 */

public class Utils {
    private static final String TAG = Utils.class.getSimpleName();

    public static RandomAccessFile fopen(String path) throws IOException {
        File f = new File(path);

        if (f.exists()) {
            f.delete();
        } else {
            File parentDir = f.getParentFile();
            if (!parentDir.exists()) {
                parentDir.mkdirs();
            }
        }

        RandomAccessFile file = new RandomAccessFile(f, "rw");
        // 16K、16bit、单声道
    /* RIFF header */
        file.writeBytes("RIFF"); // riff id
        file.writeInt(0); // riff chunk size *PLACEHOLDER*
        file.writeBytes("WAVE"); // wave type

    /* fmt chunk */
        file.writeBytes("fmt "); // fmt id
        file.writeInt(Integer.reverseBytes(16)); // fmt chunk size
        file.writeShort(Short.reverseBytes((short) 1)); // format: 1(PCM)
        file.writeShort(Short.reverseBytes((short) 1)); // channels: 1
        file.writeInt(Integer.reverseBytes(16000)); // samples per second
        file.writeInt(Integer.reverseBytes((int) (1 * 16000 * 16 / 8))); // BPSecond
        file.writeShort(Short.reverseBytes((short) (1 * 16 / 8))); // BPSample
        file.writeShort(Short.reverseBytes((short) (1 * 16))); // bPSample

        file.writeBytes("data"); // data id
        file.writeInt(0); // data chunk size *PLACEHOLDER*

        return file;
    }

    public static void fwrite(RandomAccessFile file, byte[] data, int offset, int size) throws IOException {
        file.write(data, offset, size);
    }

    public static void fclose(RandomAccessFile file) throws IOException {
        try {
            file.seek(4); // riff chunk size
            file.writeInt(Integer.reverseBytes((int) (file.length() - 8)));

            file.seek(40); // data chunk size
            file.writeInt(Integer.reverseBytes((int) (file.length() - 44)));
        } finally {
            file.close();
        }
    }
}