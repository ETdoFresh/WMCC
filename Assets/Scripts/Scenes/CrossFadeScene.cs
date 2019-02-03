using System.Collections;
using UnityEngine;

public class CrossFadeScene : MonoBehaviour
{
    public static CrossFadeScene instance;
    public int sceneBuildIndex;
    public Texture texture;
    public Coroutine coroutine;
    public float alpha = 1;
    public float duration = 1;
    private bool stopUpdating = false;

    public void Awake()
    {
        if (instance)
            instance.stopUpdating = true;

        instance = this;
        DontDestroyOnLoad(gameObject);
    }

    private void Update()
    {
        if (stopUpdating)
            return;

        if (Input.GetButtonDown("Jump"))
            FadeToScene();
    }

    public void FadeToScene()
    {
        coroutine = StartCoroutine(FadeOut(sceneBuildIndex));
    }

    public void FadeToScene(int sceneBuildIndex)
    {
        coroutine = StartCoroutine(FadeOut(sceneBuildIndex));
    }

    public void FadeToScene(string sceneName)
    {
        coroutine = StartCoroutine(FadeOut(sceneName));
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
        for (alpha = 1.0f; alpha > 0.0f; alpha -= Time.deltaTime / duration)
            yield return null;

        // Clean up
        texture = null;
        coroutine = null;
        Destroy(gameObject);
    }

    private IEnumerator FadeOut(string sceneName)
    {
        yield return new WaitForEndOfFrame();
        CaptureSceenShot();
        SceneManager.LoadScene(sceneName);

        // Fade Screenshot Out
        for (alpha = 1.0f; alpha > 0.0f; alpha -= Time.deltaTime / duration)
            yield return null;

        // Clean up
        texture = null;
        coroutine = null;
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
