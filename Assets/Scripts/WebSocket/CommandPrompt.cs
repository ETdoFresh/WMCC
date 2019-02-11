using System;
using UnityEngine;
using UnityEngine.UI;

public class CommandPrompt : Singleton<CommandPrompt>
{
    public Text textUI;
    public InputField inputField;
    public int textBuffer = 8 * 1024;
    [Multiline] public string text;

    public string Text { get => text.Substring(Math.Max(0, text.Length - textBuffer)); }

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
        textUI.text = Text;
        Debug.LogFormat(format, args);
    }

    public static void WriteLine(string format = "", params object[] args) => instance?._WriteLine(format, args);
    public void _WriteLine(string message) => _WriteLine(message, new object[0]);
    public void _WriteLine(string format = "", params object[] args)
    {
        text += string.Format(format, args) + "\n";
        textUI.text = Text;
        Debug.LogFormat(format, args);
    }

    public static void WriteErrorLine(string format = "", params object[] args) => instance?._WriteErrorLine(format, args);
    public void _WriteErrorLine(string format = "", params object[] args)
    {
        text += string.Format(format, args) + "\n";
        textUI.text = Text;
        Debug.LogErrorFormat(format, args);
    }
}