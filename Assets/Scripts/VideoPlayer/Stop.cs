using UnityEngine;

public class Stop : VideoButton
{
    protected override void OnPress()
    {
        videoPlayer.Stop();

        var previousActiveRenderTexture = RenderTexture.active;
        RenderTexture.active = videoPlayer.targetTexture;
        GL.Clear(true, true, Color.clear);
        RenderTexture.active = previousActiveRenderTexture;
    }
}