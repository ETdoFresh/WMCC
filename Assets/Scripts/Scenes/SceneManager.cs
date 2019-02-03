using UnityEngine;
using Mode = UnityEngine.SceneManagement.LoadSceneMode;
using Parameters = UnityEngine.SceneManagement.LoadSceneParameters;
using UnitySceneManager = UnityEngine.SceneManagement.SceneManager;

[CreateAssetMenu(menuName = "Scriptable Objects/SceneManager")]
public class SceneManager : SingletonSO<SceneManager>
{
    public static void LoadScene(int sceneBuildIndex) => UnitySceneManager.LoadScene(sceneBuildIndex);
    public static void LoadScene(int sceneBuildIndex, Mode mode) => UnitySceneManager.LoadScene(sceneBuildIndex, mode);
    public static void LoadScene(int sceneBuildIndex, Parameters parameters) => UnitySceneManager.LoadScene(sceneBuildIndex, parameters);
    public static void LoadScene(string sceneName) => UnitySceneManager.LoadScene(sceneName);
    public static void LoadScene(string sceneName, Mode mode) => UnitySceneManager.LoadScene(sceneName, mode);
    public static void LoadScene(string sceneName, Parameters parameters) => UnitySceneManager.LoadScene(sceneName, parameters);

    public void _FadeToScene(int sceneBuildIndex) => FadeToScene(sceneBuildIndex);
    public static void FadeToScene(int sceneBuildIndex)
    {
        FindOrCreateCrossFadeScene().FadeToScene(sceneBuildIndex);
    }

    public void _FadeToScene(string sceneName) => FadeToScene(sceneName);
    public static void FadeToScene(string sceneName)
    {
        FindOrCreateCrossFadeScene().FadeToScene(sceneName);
    }

    private static CrossFadeScene FindOrCreateCrossFadeScene()
    {
        var crossFadeScene = FindObjectOfType<CrossFadeScene>();
        if (crossFadeScene) return crossFadeScene;

        var gameObject = new GameObject("CrossFadeScene");
        DontDestroyOnLoad(gameObject);
        return gameObject.AddComponent<CrossFadeScene>();
    }
}