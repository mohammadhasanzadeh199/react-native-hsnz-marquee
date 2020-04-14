
Pod::Spec.new do |s|
  s.name         = "RNHsnzMarquee"
  s.version      = "1.0.0"
  s.summary      = "RNHsnzMarquee"
  s.description  = <<-DESC
                  RNHsnzMarquee
                   DESC
  s.homepage     = "https://www.npmjs.com/package/react-native-hsnz-marquee"
  s.license      = "MIT"
  # s.license      = { :type => "MIT", :file => "FILE_LICENSE" }
  s.author             = { "author" => "author@domain.cn" }
  s.platform     = :ios, "7.0"
  s.source       = { :git => "https://github.com/author/RNHsnzMarquee.git", :tag => "master" }
  s.source_files  = "RNHsnzMarquee/**/*.{h,m}"
  s.requires_arc = true


  s.dependency "React"
  #s.dependency "others"

end

  
