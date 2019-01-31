using System.Collections;
using UnityEngine;
using UnityEngine.SceneManagement;

public class CrossFadeScene : MonoBehaviour
{
    public static CrossFadeScene instance;
    public string nextSceneName;
    public Texture texture;
    public Coroutine coroutine;
    public float alpha = 1;
    public float duration = 1;

    public void Awake()
    {
        if (instance)
        {
            instance.nextSceneName = nextSceneName;
            Destroy(gameObject);
            return;
        }
        instance = this;
        DontDestroyOnLoad(gameObject);
    }

    private void Update()
    {
        if (Input.GetButtonDown("Jump"))
            FadeToScene(nextSceneName);
    }

    public void FadeToScene(string sceneName)
    {
        coroutine = StartCoroutine(FadeOut(sceneName));
    }

    private IEnumerator FadeOut(string sceneName)
    {
        yield return new WaitForEndOfFrame();

        var texture2D = new Texture2D(Screen.width, Screen.height, TextureFormat.RGB24, false);
        texture2D.ReadPixels(new Rect(0, 0, Screen.width, Screen.height), 0, 0, false);
        texture2D.Apply();
        texture = texture2D;

        SceneManager.LoadScene(sceneName);

        for (alpha = 1.0f; alpha > 0.0f; alpha -= Time.deltaTime / duration)
            yield return null;

        texture = null;
        coroutine = null;
    }

    private void OnGUI()
    {
        if (!texture) return;
        GUI.depth = -9999999;
        GUI.color = new Color(GUI.color.r, GUI.color.g, GUI.color.b, alpha);
        GUI.DrawTexture(new Rect(0, 0, Screen.width, Screen.height), texture);
    }
}
