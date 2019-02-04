using UnityEngine;
using UnityEngine.UI;

public class KeyboardOnClickLauncher : MonoBehaviour
{
    public Button button;
    public KeyCode keyCode = KeyCode.Return;

    private void OnValidate()
    {
        button = button ?? GetComponent<Button>();
    }

    private void Update()
    {
        if (Input.GetKeyDown(keyCode))
            button.onClick.Invoke();
    }
}
