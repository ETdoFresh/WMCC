using System;
using UnityEngine;

public class Connection : MonoBehaviour
{
    public ConnectionType connection;

    private void OnEnable()
    {
        if (connection == null) return;
        connection.Connect(OnConnect);
    }

    private void OnDisable()
    {
        if (connection == null) return;
        connection.Disconnect();
    }

    private void OnConnect()
    {
        if (connection.IsConnected)
            connection.Send("SomeCommand", OnReceive);
    }

    private void OnReceive()
    {
        ProcessCommand(connection.Data);
    }

    private void ProcessCommand(object data)
    {
        throw new NotImplementedException();
    }

    public class ConnectionType
    {
        public bool IsConnected { get; internal set; }
        public object Data { get; internal set; }

        internal void Connect(Action onConnect)
        {
            throw new NotImplementedException();
        }

        internal void Disconnect()
        {
            throw new NotImplementedException();
        }

        internal void Send(string v, Action onReceive)
        {
            throw new NotImplementedException();
        }
    }

    [Serializable]
    public class ServerWMCConnection : ConnectionType
    {

    }

    [Serializable]
    public class ServerDemoConnection : ConnectionType
    {

    }
}