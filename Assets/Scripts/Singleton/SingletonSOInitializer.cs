using UnityEngine;

public class SingletonSOInitializer : MonoBehaviour
{
    public ScriptableObject[] singletons;

    private void Awake()
    {
        foreach (var singleton in singletons)
            if (singleton is ISingletonSO singletonSO)
                singletonSO.Initialize();

        Destroy(gameObject);
    }
}