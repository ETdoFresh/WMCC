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

    public ServerType serverType;
    public string server = "localhost";
    public int port = 9080;
    public Connection connection;
    public UnityEvent onEnable;
    public UnityEvent onDisable;
    public UnityEvent onConnect;
    public UnityEvent onDisconnect;
    public UnityEventString onSend;
    public UnityEventString onReceived;
    public UnityEventString onError;
    public Coroutine coroutine;

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
        coroutine = StartCoroutine(Connect());
        onReceived.AddEditorListener(OnReceiveMessage);
    }

    private IEnumerator Connect()
    {
        if (serverType == ServerType.Simulated) yield return StartCoroutine(ConnectSimulated());
        else if (serverType == ServerType.WebSocket) yield return StartCoroutine(ConnectWebSocket());
        else if (serverType == ServerType.TcpSocket) yield return StartCoroutine(ConnectTcpSocket());
    }

    private IEnumerator ConnectSimulated()
    {
        CommandPrompt.Write("Client: Connecting to Simulated Server...");
        connection = new SimulatedConnection();
        yield return StartCoroutine(connection.Connect());
        CommandPrompt.WriteLine("Connected!");
        onConnect.Invoke();
        Send("IPAdress: 192.168.254.194");
        Send("Port: 9080");
        Send("WMCC^ETdoFresh|GetServerVersion<Client Quit>");
    }

    private void OnReceiveMessage(string message)
    {
        CommandPrompt.WriteLine("Server: {0}", message);
    }

    private void Send(string message)
    {
        CommandPrompt.WriteLine("Client: {0}", message);
        connection.SendString(message);
    }

    private IEnumerator ConnectWebSocket()
    {
        var url = new Uri("ws://" + server + ":" + port);
        CommandPrompt.WriteLine("Client Connecting to {0}...", url);
        connection = new WebSocketConnection(url);
        yield return StartCoroutine(connection.Connect());

        if (connection.Error != null)
        {
            CommandPrompt.WriteErrorLine(connection.Error);
            yield break;
        }

        CommandPrompt.WriteLine("Client Connected!");
        onConnect.Invoke();
        Send("IPAddress: 192.168.254.194");
        Send("Port: 9080");
        Send("WMCC^ETdoFresh|GetServerVersion<Client Quit>");
    }

    private IEnumerator ConnectTcpSocket()
    {
        var url = new Uri("tcp://" + server + ":" + port);
        CommandPrompt.Write("Client Connecting to {0}...", url);
        CommandPrompt.WriteLine("Connected!");
        throw new NotImplementedException();
        //onConnect.Invoke();
    }

    private IEnumerator Disconnect()
    {
        yield return new WaitForSeconds(3);
        onDisconnect.Invoke();
    }

    private void OnDisable()
    {
        onReceived.RemoveEditorListener(OnReceiveMessage);
        StopCoroutine(coroutine);
        coroutine = null;
        CommandPrompt.Write("Client Disconnecting...");
        connection.Close();
        connection = null;
        CommandPrompt.Write("Disconnected!");
        onDisable.Invoke();
    }

    private void Update()
    {
        string reply = connection.RecvString();
        if (reply != null)
            onReceived.Invoke(reply);

        if (connection.Error != null)
            onError.Invoke(connection.Error);
    }
}
