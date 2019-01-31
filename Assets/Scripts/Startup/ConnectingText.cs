using UnityEngine.UI;

public class ConnectingText : Singleton<ConnectingText>
{
    public string connected = "Connected!";
    public string disconnected = "Disconnected!";

    private void OnEnable()
    {
        Client.OnConnect.AddEditorListener(SetConnectedText);
    }

    private void OnDisable()
    {
        Client.OnConnect.RemoveEditorListener(SetConnectedText);
    }

    public void SetText(string text) => GetComponentInChildren<Text>().text = text;

    private void SetConnectedText() => SetText(connected);
    private void SetDisconnectedText() => SetText(disconnected);
}
