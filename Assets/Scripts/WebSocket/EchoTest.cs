using UnityEngine;
using System.Collections;
using System;
using UnityEngine.UI;
using UnityEngine.SceneManagement;

public class EchoTest : MonoBehaviour
{
    public string server = "ws://echo.websocket.org";

    private void Update() { if (Input.GetKeyDown(KeyCode.R)) SceneManager.LoadScene(0); }

    // Use this for initialization
    IEnumerator Start()
    {
        var uri = new Uri(server);
        CommandPrompt.WriteLine("Connecting to {0}", uri);
        WebSocketConnection w = new WebSocketConnection(uri);
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
                //if (i < 5)
                //{
                    CommandPrompt.WriteLine("Sending: Hi there{0}", i);
                    w.SendString("Hi there" + i++);
                //}
                //else
                //    FindObjectOfType<CrossFadeScene>().FadeToScene();
            }
            if (w.Error != null)
            {
                CommandPrompt.WriteErrorLine("Error: " + w.Error);
                break;
            }
            yield return 0;
        }
        w.Close();
    }
}
