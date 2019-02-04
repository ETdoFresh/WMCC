using UnityEngine;

[CreateAssetMenu(menuName ="Scriptable Objects/Settings")]
public class Settings : SingletonSO<Settings>
{
    public static Client.ServerType ServerType { get => Instance.serverType; set => Instance.serverType = value; }
    public static string ServerIP { get => Instance.serverIP; set => Instance.serverIP = value; }
    public static int ServerPort { get => Instance.serverPort; set => Instance.serverPort = value; }
    public static string ServerVersion { get => Instance.serverVersion; set => Instance.serverVersion = value; }
    public static string TcpIP { get => Instance.tcpIP; set => Instance.tcpIP = value; }
    public static int TcpPort { get => Instance.tcpPort; set => Instance.tcpPort = value; }
    public static float CrossFadeTime { get => Instance.crossFadeTime; set => Instance.crossFadeTime = value; }

    public Client.ServerType serverType = Client.ServerType.Simulated;
    public string serverIP = "127.0.0.1";
    public int serverPort = 9081;
    public string serverVersion = "Simulated v0.0";
    public string tcpIP = "127.0.0.1";
    public int tcpPort = 9080;
    public float crossFadeTime = 0.5f;
}