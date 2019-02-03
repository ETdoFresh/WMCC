using UnityEngine;

public class SingletonSOInitializer : Singleton<SingletonSOInitializer>
{
    public ScriptableObject[] singletons;

    protected override void Awake()
    {
        base.Awake();
        foreach (var singleton in singletons)
            if (singleton is ISingletonSO singletonSO)
                singletonSO.Initialize();
    }
}