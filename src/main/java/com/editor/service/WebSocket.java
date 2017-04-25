package com.editor.service;

import javax.servlet.http.HttpServlet;
import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArraySet;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * Created by Administrator on 2017/4/13.
 */
@ServerEndpoint(value = "/socket")
public class WebSocket extends HttpServlet{

    private static final String GUEST_PREFIX = "Guest";
    private static final AtomicInteger connectionIds = new AtomicInteger(0);
    private static final Set<WebSocket> connections = new CopyOnWriteArraySet<>();

    private final String nickname;
    private Session session;

    public WebSocket() {
        nickname = GUEST_PREFIX + connectionIds.getAndIncrement();
    }

    //建立连接
    @OnOpen
    public void start(Session session) {
        this.session = session;
        connections.add(this);
        String message = String.format("* %s %s", nickname, "has joined.");
        System.out.println(message);
    }

    //接受消息
    @OnMessage
    public void incoming(String message) {
        System.out.println(message.toString());
        //broadcast(filteredMessage);
        broadcast(message.toString());
    }

    //客户端关闭了连接
    @OnClose
    public void end() {
        connections.remove(this);
        String message = String.format("* %s %s", nickname, "has disconnected.");
        System.out.println(message);
        //broadcast(message);
    }

    //WebSocket服务出错
    @OnError
    public void onError(Throwable t) throws Throwable {
        System.out.println("服务端错误 :"+t.toString());
    }

    /**
     * 广播消息
     * @param msg
     */
    public static void broadcast(String msg) {
        for (WebSocket client : connections) {
            try {
                synchronized (client) {
                    client.session.getBasicRemote().sendText(msg);
                }
            } catch (IOException e) {
                System.out.println("未能够将详细发送给客户端");
                e.printStackTrace();
                connections.remove(client);
                try {
                    client.session.close();
                } catch (IOException e1) {
                    // Ignore
                }
                String message = String.format("* %s %s",
                        client.nickname, "已经失去连接.");
                broadcast(message);
            }
        }
    }


}
