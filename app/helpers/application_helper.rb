module ApplicationHelper
  def asset_path(source, options = {})
    rev_path(super(source, options))
  end

  def stylesheet_path(source, options = {})
    rev_path(super(source, options))
  end

  def javascript_path(source, options = {})
    rev_path(super(source, options))
  end

  def image_path(source, options = {})
    rev_path(super(source, options))
  end

  def video_path(source, options = {})
    rev_path(super(source, options))
  end

  def audio_path(source, options = {})
    rev_path(super(source, options))
  end

  def font_path(source, options = {})
    rev_path(super(source, options))
  end

  def rev_path(source)
    if defined?(REV_MANIFEST)
      source = source[1..-1] if source.starts_with?('/')
      source = REV_MANIFEST[source]
    end

    source.prepend('/') unless source.nil? || source.starts_with?('/')

    source
  end
end
