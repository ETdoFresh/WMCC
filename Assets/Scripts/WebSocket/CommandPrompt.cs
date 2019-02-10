using System.Collections;
using UnityEngine;
using UnityEngine.UI;

public class CommandPrompt : Singleton<CommandPrompt>
{
    public Text textUI;
    public InputField inputField;
    [Multiline] public string text;

    private void OnValidate()
    {
        textUI = textUI ?? GetComponent<Text>();
        inputField = inputField ?? FindObjectOfType<InputField>();
    }

    private void Start()
    {
        text = textUI.text;
    }

    private void Update()
    {
        if (!inputField.isFocused)
        {
            inputField.Select();
            inputField.ActivateInputField();
        }
    }

    public static void Write(string format = "", params object[] args) => instance?._Write(format, args);
    public void _Write(string format = "", params object[] args)
    {
        text += string.Format(format, args);
        textUI.text = text;
        Debug.LogFormat(format, args);
    }

    public static void WriteLine(string format = "", params object[] args) => instance?._WriteLine(format, args);
    public void _WriteLine(string message) => _WriteLine(message, new object[0]);
    public void _WriteLine(string format = "", params object[] args)
    {
        text += string.Format(format, args) + "\n";
        textUI.text = text;
        Debug.LogFormat(format, args);
    }

    public static void WriteErrorLine(string format = "", params object[] args) => instance?._WriteErrorLine(format, args);
    public void _WriteErrorLine(string format = "", params object[] args)
    {
        text += string.Format(format, args) + "\n";
        textUI.text = text;
        Debug.LogErrorFormat(format, args);
    }
}
