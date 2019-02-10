using System;
using System.Collections;
using UnityEngine;

public class Client : Singleton<Client>
{
    public enum ServerType { WebSocket, TcpSocket, Simulated }

    public static UnityEvent OnScriptEnable { get => instance.onEnable; }
    public static UnityEvent OnScriptDisable { get => instance.onDisable; }
    public static UnityEvent OnConnect { get => instance.onConnect; }
    public static UnityEvent OnDisconnect { get => instance.onDisconnect; }
    public static UnityEventString OnSend { get => instance.onSend; }
    public static UnityEventString OnReceived { get => instance.onReceived; }
    public static UnityEventString OnError { get => instance.onError; }

    public Connection connection;
    public UnityEvent onEnable;
    public UnityEvent onDisable;
    public UnityEvent onConnect;
    public UnityEvent onDisconnect;
    public UnityEventString onSend;
    public UnityEventString onReceived;
    public UnityEventString onError;
    public UnityEvent onReceivedServerInfo;
    public Coroutine coroutine;
    private string reply;

    protected override void Awake()
    {
        CommandPrompt.WriteLine("Client: Awake()");
        base.Awake();
        DontDestroyOnLoad(gameObject);
    }

    private void OnEnable()
    {
        CommandPrompt.WriteLine("Client: OnEnable()");
        onEnable.Invoke();
        coroutine = StartCoroutine(GetServerData());
    }

    private IEnumerator GetServerData()
    {
        var sequence = new IEnumerator[]
        {
            Connect(),
            GetMOTD(),
            SetTcpServer(),
            GetServerVersion(),
            PrcoessRepliesUntilDisconnect(),
        };

        foreach(var item in sequence)
            yield return StartCoroutine(item);
    }

    private IEnumerator PrcoessRepliesUntilDisconnect()
    {
        while (true)
            yield return StartCoroutine(AwaitReply());
    }

    private IEnumerator SendReceivedServerInfoEvent()
    {
        onReceivedServerInfo.Invoke();
        yield return null;
    }

    private IEnumerator SetTcpServer()
    {
        if (Settings.ServerType == ServerType.TcpSocket)
            yield break;

        Send("IPAddress: " + Settings.TcpIP);
        yield return StartCoroutine(AwaitReply());

        Send("Port: " + Settings.TcpPort);
        yield return StartCoroutine(AwaitReply());

        yield return null;
    }

    private IEnumerator AwaitReply()
    {
        while ((reply = connection.RecvString()) == null)
            yield return null;

        onReceived.Invoke(reply);
    }

    private IEnumerator GetServerVersion()
    {
        Send("WMCC^ETdoFresh|GetServerVersion<Client Quit>");
        yield return StartCoroutine(AwaitReply());
        Settings.ServerVersion = reply.Split(new[] { "<EOL>" }, StringSplitOptions.None)[0];
        onReceivedServerInfo.Invoke();
    }

    private IEnumerator GetMOTD()
    {
        yield return StartCoroutine(AwaitReply());
        onReceived.Invoke(reply);
    }

    private IEnumerator Connect()
    {
        if (Settings.ServerType == ServerType.Simulated) yield return StartCoroutine(ConnectSimulated());
        else if (Settings.ServerType == ServerType.WebSocket) yield return StartCoroutine(ConnectWebSocket());
        else if (Settings.ServerType == ServerType.TcpSocket) yield return StartCoroutine(ConnectTcpSocket());

        if (connection.Error != null)
            onError.Invoke(connection.Error);
        else
        {
            CommandPrompt.WriteLine("Connected!");
            onReceived.AddEditorListener(OnReceiveMessage);
            onConnect.Invoke();
        }
    }

    private IEnumerator ConnectSimulated()
    {
        CommandPrompt.Write("Client: Connecting to Simulated Server...");
        connection = new SimulatedConnection();
        yield return StartCoroutine(connection.Connect());
        CommandPrompt.WriteLine("Connected!");
        onConnect.Invoke();
    }

    private void OnReceiveMessage(string message)
    {
        CommandPrompt.WriteLine("Server: {0}", message);
    }

    public void Send(string message)
    {
        CommandPrompt.WriteLine("Client: {0}", message);
        connection.SendString(message);
    }

    private IEnumerator ConnectWebSocket()
    {
        var url = new Uri("ws://" + Settings.ServerIP + ":" + Settings.ServerPort);
        CommandPrompt.WriteLine("Client Connecting to {0}...", url);
        connection = new WebSocketConnection(url);
        yield return StartCoroutine(connection.Connect());
    }

    private IEnumerator ConnectTcpSocket()
    {
        var url = new Uri("tcp://" + Settings.ServerIP + ":" + Settings.ServerPort);
        CommandPrompt.Write("Client Connecting to {0}...", url);
        CommandPrompt.WriteLine("Connected!");
        throw new NotImplementedException();
    }

    private void Disconnect()
    {
        CommandPrompt.Write("Client Disconnecting...");
        connection.Close();
        connection = null;
        CommandPrompt.WriteLine("Disconnected!");
        onReceived.RemoveEditorListener(OnReceiveMessage);
        onDisconnect.Invoke();
    }

    private void OnDisable()
    {
        StopCoroutine(coroutine);
        coroutine = null;
        Disconnect();
        onDisable.Invoke();
    }
}