using UnityEngine;

public class VolumeDown: VideoButton
{
    protected override void OnPress()
    {
        Volume.Down();
        AudioListener.volume = Volume.Value;
    }
}