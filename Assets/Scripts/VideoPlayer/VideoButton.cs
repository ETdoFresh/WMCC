using UnityEngine;
using UnityEngine.UI;
using UnityEngine.Video;

public abstract class VideoButton : MonoBehaviour
{
    [SerializeField] protected Button button;
    [SerializeField] protected VideoPlayer videoPlayer;

    private void OnValidate()
    {
        button = button ?? GetComponent<Button>();
        videoPlayer = videoPlayer ?? FindObjectOfType<VideoPlayer>();
    }

    private void OnEnable()
    {
        button.onClick.AddEditorListener(OnPress);
    }

    private void OnDisable()
    {
        button.onClick.RemoveEditorListener(OnPress);
    }

    protected abstract void OnPress();
}