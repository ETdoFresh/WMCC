using UnityEngine;

[CreateAssetMenu(menuName ="Scriptable Objects/Settings")]
public class Settings : SingletonSO<Settings>
{
    public static Client.ServerType ServerType { get => instance.serverType; set => instance.serverType = value; }
    public static string ServerIP { get => instance.serverIP; set => instance.serverIP = value; }
    public static int ServerPort { get => instance.serverPort; set => instance.serverPort = value; }
    public static string ServerVersion { get => instance.serverVersion; set => instance.serverVersion = value; }
    public static string TcpIP { get => instance.tcpIP; set => instance.tcpIP = value; }
    public static int TcpPort { get => instance.tcpPort; set => instance.tcpPort = value; }
    public static float CrossFadeTime { get => instance.crossFadeTime; set => instance.crossFadeTime = value; }

    public Client.ServerType serverType;
    public string serverIP;
    public int serverPort;
    public string serverVersion;
    public string tcpIP;
    public int tcpPort;
    public float crossFadeTime = 0.5f;
}