using System.Collections;
using UnityEngine;
using UnityEngine.EventSystems;

public class ShowHideButtons : MonoBehaviour
{
    public new Animation animation;
    public Vector3 previousMousePosition;
    public float hideButtonsAfter = 3;
    private Coroutine coroutine;

    private void OnValidate()
    {
        animation = animation ?? GetComponentInParent<Animation>();
    }

    private void Update()
    {
        if (Input.mousePosition != previousMousePosition)
        {
            previousMousePosition = Input.mousePosition;
            if (coroutine != null)
                StopCoroutine(coroutine);

            coroutine = StartCoroutine(ShowButtons());
        }
    }

    private IEnumerator ShowButtons()
    {
        var showButtons = animation.GetClip("ShowButtons");
        if (animation.clip != showButtons)
        {
            animation.clip = showButtons;
            animation.Play();
        }

        yield return new WaitForSeconds(hideButtonsAfter);

        animation.clip = animation.GetClip("HideButtons");
        animation.Rewind();
        animation.Play();
        coroutine = null;
    }
}