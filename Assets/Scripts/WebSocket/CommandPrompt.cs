using System.Collections;
using UnityEngine;
using UnityEngine.UI;

public class CommandPrompt : Singleton<CommandPrompt>
{
    public Text textUI;
    public float blinkRate = 0.2f;
    [Multiline] public string text;

    private Coroutine flashingCursor;

    void OnEnable()
    {
        flashingCursor = StartCoroutine(FlashCursor());
    }

    void Start()
    {
        text = textUI.text;
    }

    void OnDisable()
    {
        StopCoroutine(flashingCursor);
        flashingCursor = null;
    }

    IEnumerator FlashCursor()
    {
        if (!textUI) yield break;

        bool showUnderscore = false;
        while (enabled)
        {
            yield return new WaitForSeconds(blinkRate);
            showUnderscore = !showUnderscore;
            textUI.text = text;
            textUI.text += showUnderscore ? "_" : "";
        }
    }

    public static void Write(string format = "", params object[] args)
    {
        instance.text += string.Format(format, args);
        instance.textUI.text = instance.text;
        Debug.LogFormat(format, args);
    }

    public static void WriteLine(string format = "", params object[] args)
    {
        instance.text += string.Format(format, args) + "\n";
        instance.textUI.text = instance.text;
        Debug.LogFormat(format, args);
    }

    public static void WriteErrorLine(string format = "", params object[] args)
    {
        instance.text += string.Format(format, args) + "\n";
        instance.textUI.text = instance.text;
        Debug.LogErrorFormat(format, args);
    }
}
