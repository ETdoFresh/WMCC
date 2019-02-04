using UnityEngine;

public class SingletonSO<T> : ScriptableObject, ISingletonSO where T : SingletonSO<T>
{
    protected static T Instance
    {
        get
        {
#if UNITY_EDITOR
            if (instance) return instance;
            else return CreateInstance<T>();
#else
            return instance;
#endif
        }
    }

    private static T instance;

    public virtual void Initialize()
    {
        if (instance) { return; }
        instance = this as T;
    }

    public virtual void Update() { }

    private void OnDestroy()
    {
        if (instance == this)
            instance = null;
    }
}

public interface ISingletonSO { void Initialize(); void Update(); }