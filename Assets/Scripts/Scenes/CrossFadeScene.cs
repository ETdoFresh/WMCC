using System.Collections;
using UnityEngine;

public class CrossFadeScene : MonoBehaviour
{
    public int sceneBuildIndex;
    public Texture texture;
    public float alpha = 1;

    public void Awake()
    {
        DontDestroyOnLoad(gameObject);
    }

    public void FadeToScene()
    {
        StartCoroutine(FadeOut(sceneBuildIndex));
    }

    public void FadeToScene(int sceneBuildIndex)
    {
        StartCoroutine(FadeOut(sceneBuildIndex));
    }

    public void FadeToScene(string sceneName)
    {
        StartCoroutine(FadeOut(sceneName));
    }

    public void FadeToSceneAfterDelay(float time)
    {
        Invoke("FadeToScene", time);
    }

    private IEnumerator FadeOut(int sceneBuildIndex)
    {
        yield return new WaitForEndOfFrame();
        CaptureSceenShot();
        SceneManager.LoadScene(sceneBuildIndex);

        // Fade Screenshot Out
        for (alpha = 1.0f; alpha > 0.0f; alpha -= Time.deltaTime / Settings.CrossFadeTime)
            yield return null;

        // Clean up
        texture = null;
        Destroy(gameObject);
    }

    private IEnumerator FadeOut(string sceneName)
    {
        yield return new WaitForEndOfFrame();
        CaptureSceenShot();
        SceneManager.LoadScene(sceneName);

        // Fade Screenshot Out
        for (alpha = 1.0f; alpha > 0.0f; alpha -= Time.deltaTime / Settings.CrossFadeTime)
            yield return null;

        // Clean up
        texture = null;
        Destroy(gameObject);
    }

    private void CaptureSceenShot()
    {
        var texture2D = new Texture2D(Screen.width, Screen.height, TextureFormat.RGB24, false);
        texture2D.ReadPixels(new Rect(0, 0, Screen.width, Screen.height), 0, 0, false);
        texture2D.Apply();
        texture = texture2D;
    }

    private void OnGUI()
    {
        if (!texture) return;
        GUI.depth = -9999999;
        GUI.color = new Color(GUI.color.r, GUI.color.g, GUI.color.b, alpha);
        GUI.DrawTexture(new Rect(0, 0, Screen.width, Screen.height), texture);
    }
}