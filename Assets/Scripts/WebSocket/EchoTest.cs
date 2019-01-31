using UnityEngine;
using System.Collections;
using System;
using UnityEngine.UI;

public class EchoTest : MonoBehaviour
{
    // Use this for initialization
    IEnumerator Start()
    {
        var uri = new Uri("ws://echo.websocket.org");
        CommandPrompt.WriteLine("Connecting to {0}", uri);
        WebSocket w = new WebSocket(uri);
        yield return StartCoroutine(w.Connect());
        CommandPrompt.WriteLine("Connected!");

        CommandPrompt.WriteLine();
        CommandPrompt.WriteLine("Loading next scene after 5 echos");
        CommandPrompt.WriteLine();

        CommandPrompt.WriteLine("Sending: Hi there");
        w.SendString("Hi there");
        int i = 0;
        while (true)
        {
            string reply = w.RecvString();
            if (reply != null)
            {
                CommandPrompt.WriteLine("Received: " + reply);
                if (i < 5)
                {
                    CommandPrompt.WriteLine("Sending: Hi there{0}", i);
                    w.SendString("Hi there" + i++);
                }
                else
                    FindObjectOfType<CrossFadeScene>().FadeToScene();
            }
            if (w.error != null)
            {
                CommandPrompt.WriteErrorLine("Error: " + w.error);
                break;
            }
            yield return 0;
        }
        w.Close();
    }
}
